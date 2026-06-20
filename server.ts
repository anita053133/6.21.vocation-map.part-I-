import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

// Full-stack API Route for AI summary synthesis
app.post("/api/ai-summary", async (req, res) => {
  try {
    const { values, material, spiritual } = req.body;

    const valuesStr = Array.isArray(values)
      ? values
          .map((v: any, index: number) => `第 ${index + 1} 名：【${v.name || ""}】\n原因或回憶：${v.reason || ""}`)
          .join("\n")
      : "無選擇";

    const materialStr = Object.entries(material || {})
      .map(([key, value]: [string, any]) => {
        const title = value.title || key;
        const tags = Array.isArray(value.tags) ? value.tags.join("、") : "";
        const custom = value.custom || "";
        return `- ${title}：已選畫面為「${tags}」${custom ? `，自訂描述：「${custom}」` : ""}`;
      })
      .join("\n");

    const spiritualStr = `
- 崇拜、尊敬的人及特質：${spiritual?.admired || "未填"}
- 喜歡的角色與其特質：${spiritual?.characters || "未填"}
- 童年或希望成長到的模樣：${spiritual?.childhood || "未填"}
- 終點的墓誌銘形容：${spiritual?.epitaph || "未填"}
- 絕對不想經歷的痛苦窒息感：${spiritual?.negative || "未填"}
`;

    const prompt = `
你是一位專業、溫暖且充滿同理心的「生涯設計師／教練」。
今天你在與個案進行一對一的理想生活對談。個案在工作坊中填寫了自我的探索紀錄（包含價值觀、物質欲望與精神渴望）。
你的任務是扮演這位引導和支持的教練，依據個案填寫的內容，協助他們將理想未來生活的樣貌描述得更具體化，讓他們在閱讀時能自然產生一幅清晰的「畫面感」與「切實的感受」。

請遵循以下寫作與引導原則：
1. 角色定位：請以「生涯設計師／教練」溫和、沈穩且客觀引導的口吻，絕對不要提及虛擬冒險、關卡、冒險者、魔法等奇幻設定。
2. 具體化描繪：將他們的價值觀、渴望擁有的日常生活場景、所欣賞的特質與避開的窒息感，融合寫成一段細緻且富有畫面感的「理想生活一幕」。直接將抽象的詞彙「落地」為具體的感官場景（例如：空氣、光線、健康的餐飲、放鬆的工作步調、自律自適的個人空間或與重要之人的恬靜互動）。
3. 窒息感的覺察：對他們寫下的「絕對不想經歷的窒息感」表示同理，告訴並引導他們理解「正是因為你如此重視內心純粹與自由自主，才不願意向這些妥協與消耗低頭」，進而將之轉化為向前的堅定指南針。
4. 格式與風格：
   - 採用繁體中文（zh-TW），語氣溫柔而專業不失力量。
   - 長度約為三至四個自然段，不要過於繁雜。
   - 結尾為他們凝聚一句量身打造、溫柔落地的鼓勵小語。

以下是個案的探索記錄：

===== 1. 價值觀排序 =====
${valuesStr}

===== 2. 物質欲望（嚮往的日常生活畫面） =====
${materialStr}

===== 3. 精神渴望（期待成為的狀態與想避開的窒息感） =====
${spiritualStr}

請依據上述原則與內容，為個案撰寫這篇「理想生活景象收斂」暖心分析：
`;

    let generatedText = "";
    try {
      const client = getGeminiClient();
      console.log("Attempting generation with gemini-3.5-flash...");
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });
      generatedText = response.text || "";
    } catch (err: any) {
      console.warn("First attempt with gemini-3.5-flash failed, retrying with gemini-flash-latest...", err.message || err);
      try {
        const client = getGeminiClient();
        const response = await client.models.generateContent({
          model: "gemini-flash-latest",
          contents: prompt,
        });
        generatedText = response.text || "";
        console.log("Successfully generated with gemini-flash-latest!");
      } catch (retryErr: any) {
        console.error("All Gemini API attempts failed. Using local synthesis fallback.", retryErr.message || retryErr);
        
        // Fallback local responsive generation
        const primaryValue = values?.[0]?.name || "最重視的自我價值";
        const secondValue = values?.[1]?.name || "生活與身心的平衡";
        const firstMaterial = Object.values(material || {})[0] as any;
        const matSummary = firstMaterial ? `在「${firstMaterial.title}」裡看見的「${firstMaterial.tags?.[0] || firstMaterial.custom || "期待的畫面"}」` : "您心中的每一幅畫";
        
        generatedText = `你好：

看完了你的探索紀錄，身為你的生涯設計師與教練，我能清晰地感受到你對於生活品質與心靈自由的深切渴望。在你的價值觀排序中，【${primaryValue}】與【${secondValue}】是重要的指引。而你所列出的日常物質渴望，例如${matSummary}，正是你為了給自己打造一個能放鬆深呼吸、安頓身心的具體生活基底。

當我們看着你所欣賞的角色與嚮往的特質時，那正是深藏在你心中的一部分自我，正期待著在未來的某一天，能更自在、更主動地被活出來。而那些你寫下「絕對不想經歷的痛苦窒息感」，正是一面溫柔的鏡子：因為你如此珍視自己內心的純粹與自由，所以才不願意向那些限制與消耗妥協。

在未來的理想生活景象中，想像你正在一個讓自己感到放鬆、有秩序的空間裡，按照自己的步調，維繫着健康的作息與飲食。因為你勇敢地為自己做出了選擇，你的生活不再被壓力淹沒，而是充滿了自主性，並且每一天都帶著踏實的自信起步。

✨ 生涯教練想送給你的一句話：
「當你開始看見並勾勒出理想生活的輪廓，你的每一個微小選擇，都正在帶領你往那個有光的未來走去。」`;
      }
    }

    res.json({ success: true, text: generatedText });
  } catch (error: any) {
    console.error("Endpoint error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
