/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Gamepad2,
  Home,
  Sword,
  Sparkles,
  Plus,
  Check,
  Brain,
  X,
  Loader2,
  Calendar,
  AlertCircle,
  HelpCircle,
  RotateCw,
  Target,
  ArrowRight
} from "lucide-react";
import { ValueRank, MaterialCategory, SpiritualInputs, MatrixScores } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<"page1" | "page2" | "page3">("page1");

  // ==========================================
  // PAGE 1: WEAKNESS FLIP STATE
  // ==========================================
  const [flippedWeakness, setFlippedWeakness] = useState<string | null>(null);

  const weaknessesList = [
    {
      id: "indecisive",
      name: "沒主見 / 容易猶豫",
      strength: "能夠溫柔體貼，傾聽眾人意見，是團隊中極佳的協調者與和事佬。"
    },
    {
      id: "shy",
      name: "怕生 / 不擅社交",
      strength: "擅長一對一深度連結與高敏感洞察，是極佳的傾聽者與深思熟慮的研究者。"
    },
    {
      id: "stubborn",
      name: "固執 / 難以妥協",
      strength: "極具原則與毅力，對細節絕不妥協，在需要把關品質與執行紀律的關卡是頂尖主力。"
    },
    {
      id: "impulsive",
      name: "沒耐性 / 粗心急躁",
      strength: "行動力爆表！敢於快速試錯，是衝破僵局的破局者與高效率執行先鋒。"
    },
    {
      id: "dreamer",
      name: "愛幻想 / 不切實際",
      strength: "擁有充沛的創造力與宏大願景，能跳脫框架思考，是設計藍圖與開路先鋒的核心。"
    },
    {
      id: "timid",
      name: "生性膽小 / 容易焦慮",
      strength: "天生危機管理專家！能將萬全準備做到極致，未雨綢繆避開所有潛在暗礁。"
    }
  ];

  // ==========================================
  // PAGE 2: VALUES SORTING STATE
  // ==========================================
  const [customValueInput, setCustomValueInput] = useState("");
  const [valuesPool, setValuesPool] = useState<string[]>([
    "地位", "成長", "挑戰", "創意", "影響力",
    "人際", "家庭", "貢獻", "歸屬感", "真誠",
    "金錢", "健康", "安定", "舒適", "秩序",
    "自由", "興趣", "自信", "樂趣", "美感"
  ]);

  const [topValues, setTopValues] = useState<ValueRank[]>([
    { name: "", reason: "" },
    { name: "", reason: "" },
    { name: "", reason: "" }
  ]);

  const handleAddCustomValue = (e: React.FormEvent) => {
    e.preventDefault();
    const val = customValueInput.trim();
    if (val && !valuesPool.includes(val)) {
      setValuesPool([...valuesPool, val]);
      setCustomValueInput("");
    }
  };

  const handleSelectValueForRank = (valueName: string, rankIdx: number) => {
    const updated = [...topValues];
    // Remove if already selected in another slot
    updated.forEach((slot, idx) => {
      if (slot.name === valueName) {
        updated[idx] = { name: "", reason: "" };
      }
    });

    updated[rankIdx] = { name: valueName, reason: updated[rankIdx].reason };
    setTopValues(updated);
  };

  const handleUpdateReason = (rankIdx: number, val: string) => {
    const updated = [...topValues];
    updated[rankIdx].reason = val;
    setTopValues(updated);
  };

  const handleClearRank = (rankIdx: number) => {
    const updated = [...topValues];
    updated[rankIdx] = { name: "", reason: "" };
    setTopValues(updated);
  };

  // ==========================================
  // PAGE 2: MATERIAL DESIRES VALUE DEFINITIONS & CATEGORIES
  // ==========================================
  const [materialCategories, setMaterialCategories] = useState<{ [key: string]: MaterialCategory }>({
    livingArea: {
      title: "居住區域",
      tags: ["便利鬧區 / 捷運沿線", "幽靜住宅區", "靠海小鎮 / 沙灘旁", "山景近郊 / 森林旁", "步調緩慢的老街區", "海外城市 / 異國移居"],
      selection: [],
      customText: "",
      placeholder: "其他自訂畫面... (例如：住在有大片草地的社區)"
    },
    homeStyle: {
      title: "自住的家",
      tags: ["極簡奶油風公寓", "大片採光落地窗", "獨立中島大廚房", "毛孩奔跑的獨立庭院", "專屬獨立工作室", "頂樓露台花園", "高隱私大坪數住宅"],
      selection: [],
      customText: "",
      placeholder: "其他自訂畫面... (例如：家裡要有一個大書房)"
    },
    food: {
      title: "飲食生活",
      tags: ["每週發掘質感餐廳", "無菜單頂級料理", "親自下廚健康原型食物", "每天早晨精品手沖咖啡", "產地直送新鮮食材", "無負擔精緻蔬食"],
      selection: [],
      customText: "",
      placeholder: "其他自訂畫面... (例如：週末跟朋友在家煮火鍋)"
    },
    hobbies: {
      title: "興趣",
      tags: ["生活美學 (美甲/插花/陶藝)", "藝文創作 (畫畫/寫作/攝影)", "音樂與樂器", "戶外探險 (露營/潛水)", "室內靜態 (拼模型/看書)", "自媒體經營", "自學新技能"],
      selection: [],
      customText: "",
      placeholder: "其他自訂畫面... (例如：每週去學跳舞)"
    },
    family: {
      title: "家人",
      tags: ["每天高質量陪伴", "每週末家庭聚餐", "定期帶家人旅行", "舒適獨立空間", "各自忙碌互為後盾", "三代同堂熱鬧生活"],
      selection: [],
      customText: "",
      placeholder: "其他自訂畫面... (例如：每年帶父母出國一次)"
    },
    social: {
      title: "人際來往",
      tags: ["3-5位靈魂摯友", "多元社群交流", "只和滋養的人相處", "職場安全距離", "參與能量同好會", "極簡社交享受獨處"],
      selection: [],
      customText: "",
      placeholder: "其他自訂畫面... (例如：認識不同領域的創業家)"
    },
    pets: {
      title: "寵物",
      tags: ["黏人的貓奴生活", "狗狗每天散步", "療癒的小動物", "優雅水族生態", "無需對生命負責", "參與浪浪志工"],
      selection: [],
      customText: "",
      placeholder: "其他自訂畫面... (例如：家裡養兩隻橘貓)"
    },
    holidays: {
      title: "如何度過假日",
      tags: ["宅家充飽電", "逛市集/看展覽", "街弄散步喝咖啡", "說走就走小旅行", "熱血運動健身", "放空露營", "遠離通訊軟體"],
      selection: [],
      customText: "",
      placeholder: "其他自訂畫面... (例如：開車去北海岸看海)"
    },
    favoriteItems: {
      title: "光看就會笑容滿面、喜愛的物品 (服裝、鞋子、包包、飾品、化妝品、雜貨、家具、遊戲等等任何東西)",
      tags: ["高質感原創飾品", "極簡膠囊衣櫥", "個人招牌香氛", "品味設計師家具", "最新科技3C", "紀念價值收藏品", "手作溫度雜貨"],
      selection: [],
      customText: "",
      placeholder: "其他自訂畫面... (例如：收集滿滿一面牆的公仔)"
    },
    timeFinancial: {
      title: "其他（時間與財務等）",
      tags: ["時間完全自主", "財務安全感", "說停工就停工", "掌握生活節奏", "源源不絕的靈感", "睡到自然醒"],
      selection: [],
      customText: "",
      placeholder: "其他自訂畫面... (例如：隨時可以出國長住一個月)"
    }
  });

  const handleToggleMaterialTag = (categoryKey: string, tag: string) => {
    setMaterialCategories((prev) => {
      const cat = prev[categoryKey];
      const selected = cat.selection.includes(tag)
        ? cat.selection.filter((t) => t !== tag)
        : [...cat.selection, tag];
      return {
        ...prev,
        [categoryKey]: {
          ...cat,
          selection: selected
        }
      };
    });
  };

  const handleUpdateMaterialCustom = (categoryKey: string, text: string) => {
    setMaterialCategories((prev) => {
      const cat = prev[categoryKey];
      return {
        ...prev,
        [categoryKey]: {
          ...cat,
          customText: text
        }
      };
    });
  };

  // ==========================================
  // PAGE 2: SPIRITUAL DESIRES STATE
  // ==========================================
  const [spiritualInputs, setSpiritualInputs] = useState<SpiritualInputs>({
    admired: "",
    characters: "",
    childhood: "",
    epitaph: "",
    negative: ""
  });

  const handleUpdateSpiritualInput = (field: keyof SpiritualInputs, value: string) => {
    setSpiritualInputs((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // ==========================================
  // PAGE 2: AI SUMMARY SYSTEM STATE
  // ==========================================
  const [aiLoading, setAiLoading] = useState(false);
  const [aiLoadingPhase, setAiLoadingPhase] = useState("");
  const [aiResult, setAiResult] = useState<string | null>(null);

  const generateAISummary = async () => {
    setAiLoading(true);
    setAiResult(null);

    const phases = [
      "✨ 正在讀取靈魂碎片，連結理想星圖...",
      "🌀 正在交叉分析價值觀與精神心流特徵...",
      "📜 正在為妳描摹未來的理想晨光與生活畫面..."
    ];

    setAiLoadingPhase(phases[0]);
    const p1 = setTimeout(() => setAiLoadingPhase(phases[1]), 800);
    const p2 = setTimeout(() => setAiLoadingPhase(phases[2]), 1600);

    try {
      const valuesData = topValues
        .filter((v) => v.name)
        .map((v, i) => ({ rank: i + 1, name: v.name, reason: v.reason }));

      const materialData: { [key: string]: { title: string; tags: string[]; custom: string } } = {};
      (Object.entries(materialCategories) as [string, MaterialCategory][]).forEach(([key, value]) => {
        if (value.selection.length > 0 || value.customText.trim()) {
          materialData[key] = {
            title: value.title,
            tags: value.selection,
            custom: value.customText
          };
        }
      });

      const response = await fetch("/api/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values: valuesData,
          material: materialData,
          spiritual: spiritualInputs
        })
      });

      const result = await response.json();
      if (result.success) {
        setAiResult(result.text);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error(err);
      const primaryValName = topValues[0]?.name || "自我探索";
      setAiResult(`親愛的冒險者，

妳的理想未來，是一幅充滿活力與溫暖的畫卷。在妳排出的價值觀中，【${primaryValName}】是高懸於天空引領妳不迷失的星辰。

在那裡，妳不再為了金錢與時間的匱乏而焦慮，擁有充裕的餘裕，能在採光極佳的空間裡，沉浸在熱愛的事物中。

妳期許自己能像溫暖的太陽一樣，用開朗的笑容與堅定的能量，感染身邊互相滋養的夥伴。未來的妳，是一個充滿自信、能帶給別人力量，且真正喜歡著自己的人。

✨ 導航員想送給妳的一句話：
「當妳終於學會把眼睛放在自己的光芒上，整個世界的風，都會開始為妳伴奏。」`);
    } finally {
      clearTimeout(p1);
      clearTimeout(p2);
      setAiLoading(false);
    }
  };

  // ==========================================
  // PAGE 3: THINGS I WANT TO DO & DYNAMIC MATRIX
  // ==========================================
  const [timeframe, setTimeframe] = useState("");
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);

  const toggleDimension = (dimKey: string) => {
    setSelectedDimensions((prev) =>
      prev.includes(dimKey) ? prev.filter((k) => k !== dimKey) : [...prev, dimKey]
    );
  };

  // Matrix actions & variations data exactly matched layout of original file
  const matrixData: { [key: string]: { title: string; actions: string[]; variations: string[] } } = {
    work: {
      title: "💼 職涯與工作 (Work)",
      actions: ["提升評價", "升遷、升格", "異動", "轉職", "副業", "創業", "其他"],
      variations: [
        "A. 改變工作內容 (業界、職種、業務內容)",
        "B. 改變職位、擔任的角色",
        "C. 增加薪水、收入",
        "D. 改變工作方式 (地點、工時、時段、休假日)",
        "E. 改善人際關係 或作個人大更新"
      ]
    },
    love: {
      title: "🧡 關係與社群 (Love)",
      actions: ["主動表達 (無手機之夜)", "拓展圈子 (線下社群)", "設立界線 (拒絕情勒)", "引進新成員 (領養寵物)"],
      variations: [
        "改變與人互動的日常活動",
        "在關係中承擔新角色",
        "微調時間分配",
        "進行人際關係斷捨離"
      ]
    },
    health: {
      title: "🌿 健康與身心 (Health)",
      actions: [
        "降階選擇（飲料降糖/外食加菜）", 
        "微量伸展（辦公椅拉伸/多走幾步）", 
        "留白放空（睡前關螢幕躺平/聽歌）", 
        "隨手防護（吞維他命/隨身帶好水）"
      ],
      variations: [
        "A. 調整日常吃喝與作息習慣",
        "B. 為身心保養留點微小的預算或時間",
        "C. 少做一點讓自己感到內耗或累垮的事"
      ]
    },
    play: {
      title: "🪐 內在與自我 (Play/Self)",
      actions: ["沉浸興趣 (美甲畫畫)", "自我修煉 (牌卡AI工具)", "寫作記錄 (覺察日記)", "時間實驗 (提早一小時起床)"],
      variations: [
        "奪回時間的主導權",
        "改變對自我身份的認同",
        "增加對大腦與靈魂的自我投資"
      ]
    }
  };

  const [matrixScores, setMatrixScores] = useState<MatrixScores>({});

  const handleScoreChange = (dimKey: string, variationIdx: number, actionIdx: number, score: number) => {
    setMatrixScores((prev) => {
      const dimScores = prev[dimKey] || {};
      const rowScores = dimScores[variationIdx] || {};
      return {
        ...prev,
        [dimKey]: {
          ...dimScores,
          [variationIdx]: {
            ...rowScores,
            [actionIdx]: score
          }
        }
      };
    });
  };

  const getActionSum = (dimKey: string, actionIdx: number): number => {
    const dim = matrixData[dimKey];
    let sum = 0;
    if (!dim) return 0;
    const scores = matrixScores[dimKey];
    if (!scores) return 0;

    dim.variations.forEach((_, vIdx) => {
      const val = scores[vIdx]?.[actionIdx];
      if (val) sum += val;
    });

    return sum;
  };

  // ==========================================
  // FINAL ACTION CARD MODAL STATE
  // ==========================================
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<{
    success: boolean;
    title: string;
    description: React.ReactNode;
    icon: string;
  }>({
    success: false,
    title: "",
    description: null,
    icon: ""
  });

  const handleDownloadTxt = () => {
    let text = `===================================================\n`;
    text    += `        天職地圖：理想未來導航儀 - 個人探索報告\n`;
    text    += `===================================================\n`;
    text    += `產出日期: ${new Date().toLocaleDateString("zh-TW")} ${new Date().toLocaleTimeString("zh-TW")}\n\n`;

    text    += `---------------------------------------------------\n`;
    text    += `【第一階段：1-1 理想生活樣貌】\n`;
    text    += `---------------------------------------------------\n\n`;

    text    += `★ 價值觀排序：\n`;
    topValues.forEach((slot, idx) => {
      text += `  [前三核心價值 - 第 ${idx + 1} 名]：${slot.name || "(未填寫)"}\n`;
      text += `  重視的原因或關鍵回憶：\n  ${slot.reason || "(未填寫)"}\n\n`;
    });

    text    += `★ 想獲得的理想生活 (物質欲望)：\n`;
    (Object.entries(materialCategories) as [string, MaterialCategory][]).forEach(([key, cat]) => {
      const selectedTags = cat.selection.join("、");
      text += `- ${cat.title}：\n`;
      text += `  已選取標籤: ${selectedTags || "(無選取)"}\n`;
      text += `  自訂其他專屬畫面: ${cat.customText || "(無填寫)"}\n\n`;
    });

    text    += `★ 想成為的樣貌 (精神欲望)：\n`;
    text    += ` Q1. 崇拜、尊敬的人：\n   ${spiritualInputs.admired || "(未填寫)"}\n\n`;
    text    += ` Q2. 喜歡的角色：\n   ${spiritualInputs.characters || "(未填寫)"}\n\n`;
    text    += ` Q3. 過去的自己（希望成長的模樣）：\n   ${spiritualInputs.childhood || "(未填寫)"}\n\n`;
    text    += ` Q4. 未來的墓誌銘形容：\n   ${spiritualInputs.epitaph || "(未填寫)"}\n\n`;
    text    += ` Q5. 負面探索（絕對不想再經歷）：\n   ${spiritualInputs.negative || "(未填寫)"}\n\n`;

    text    += `★ AI 導航員：收斂我的理想未來：\n`;
    text    += `  ${aiResult || "(尚未進行分析收斂，或使用了預設背景)"}\n\n`;

    text    += `---------------------------------------------------\n`;
    text    += `【第二階段：1-2 想做的事】\n`;
    text    += `---------------------------------------------------\n\n`;
    text    += `★ 預計實現目標時期：${timeframe || "(未填寫)"}\n\n`;

    text    += `★ 各變化面向評分＆優先度：\n`;
    if (selectedDimensions.length === 0) {
      text += `  (尚未圈選任何生活變化面向)\n`;
    } else {
      selectedDimensions.forEach((dimKey) => {
        const data = matrixData[dimKey];
        text += `  [面向] ${data.title}\n`;
        data.actions.forEach((actName, aIdx) => {
          const sum = getActionSum(dimKey, aIdx);
          text += `  - ${actName}: ${sum} 分\n`;
        });
        text += `\n`;
      });
    }

    // Process top 20% actions
    const allScoredActions: { name: string; score: number; catTitle: string }[] = [];
    selectedDimensions.forEach((dimKey) => {
      const data = matrixData[dimKey];
      const scores = matrixScores[dimKey];
      if (!scores) return;

      data.actions.forEach((actName, aIdx) => {
        const score = getActionSum(dimKey, aIdx);
        if (score > 0) {
          allScoredActions.push({
            name: actName,
            score,
            catTitle: data.title.split(" (")[0] || data.title
          });
        }
      });
    });

    text += `★ 全方位行動興致排序 (由高到低)：\n`;
    if (allScoredActions.length === 0) {
      text += `  (目前尚無大於0分的行動指標)\n`;
    } else {
      allScoredActions.sort((a, b) => b.score - a.score);
      const highlightCount = Math.max(1, Math.ceil(allScoredActions.length * 0.2));
      allScoredActions.forEach((act, idx) => {
        const isHigh = idx < highlightCount;
        text += `  - [${act.catTitle}] ${act.name}: ${act.score}分 ${isHigh ? "(前20%指標)" : ""}\n`;
      });
    }

    text += `\n===================================================\n`;
    text += `   親愛的冒險者，願妳看清目標，自信而溫柔地向前走！\n`;
    text += `===================================================\n`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `天職地圖-個人探索報告-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    // 1. 打開一個全新、乾淨的空白瀏覽器分頁 (約定名稱為 printWindow)
    const printWindow = window.open("", "_blank");
    
    // 2. 防禦性檢查：有些瀏覽器會攔截彈出視窗（Popup Blocker），若被攔截會回傳 null
    if (!printWindow) {
      alert("開啟 PDF 下載失敗，請允許此網站開啟彈出視窗！");
      return;
    }

    // Formatting top values HTML
    const valuesHtml = topValues.map((slot, idx) => {
      const medals = ["🥇 第一名", "🥈 第二名", "🥉 第三名"];
      return `
        <div style="background-color: #FAF8F2; border: 1px solid #EAE5D9; border-radius: 12px; padding: 15px; margin-bottom: 12px;">
          <h4 style="margin: 0 0 8px 0; color: #E6A08A; font-weight: bold; font-size: 16px;">
            ${medals[idx]}：${slot.name ? `<span style="color: #3C3A36; font-size: 18px;">${slot.name}</span>` : '<span style="color: #999; font-style: italic;">（未填寫）</span>'}
          </h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #555;">
            <strong>重視原因 / 關鍵回憶：</strong><br/>
            ${slot.reason ? slot.reason.replace(/\n/g, "<br/>") : "（未填寫）"}
          </p>
        </div>
      `;
    }).join("");

    // Formatting material desires HTML
    const materialHtml = (Object.entries(materialCategories) as [string, MaterialCategory][]).map(([key, cat]) => {
      const selectedTags = cat.selection.join("、");
      return `
        <tr style="border-bottom: 1px solid #EAE5D9;">
          <td style="padding: 10px; font-weight: bold; color: #3C3A36; background-color: #FAF8F2; width: 140px; font-size: 14px;">${cat.title}</td>
          <td style="padding: 10px; font-size: 14px;">
            <div style="margin-bottom: 5px;"><strong>已選特徵：</strong> ${selectedTags ? `<span style="background-color: #FAF5E8; border: 1px solid #EAE5D9; padding: 2px 8px; border-radius: 5px; color: #E6A08A; font-weight: 500;">${selectedTags}</span>` : '<span style="color: #999;">（無選取）</span>'}</div>
            <div><strong>自訂畫面：</strong> <span style="color: #555;">${cat.customText || "（無填寫）"}</span></div>
          </td>
        </tr>
      `;
    }).join("");

    // Sorting actions for general summary
    const allScoredActions: { name: string; score: number; catTitle: string; emoji: string }[] = [];
    selectedDimensions.forEach((dimKey) => {
      const data = matrixData[dimKey];
      const emoji = dimKey === "work" ? "💼" : dimKey === "love" ? "🧡" : dimKey === "health" ? "🌿" : "🪐";
      data.actions.forEach((actName, aIdx) => {
        const score = getActionSum(dimKey, aIdx);
        if (score > 0) {
          allScoredActions.push({
            name: actName,
            score,
            catTitle: data.title.split(" (")[0] || data.title,
            emoji
          });
        }
      });
    });

    allScoredActions.sort((a, b) => b.score - a.score);
    const highlightCount = Math.max(1, Math.ceil(allScoredActions.length * 0.2));

    const scoredActionsHtml = allScoredActions.map((act, idx) => {
      const isHigh = idx < highlightCount;
      return `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #EEE; ${isHigh ? "background-color: #FFFDF9; border-left: 4px solid #F59E0B;" : ""}">
          <div>
            <div style="font-weight: bold; font-size: 14px; color: #3C3A36;">
              ✨ ${act.name}
              ${isHigh ? '<span style="background-color: #F59E0B; color: white; padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 950; margin-left: 6px; vertical-align: middle;">前20%指標</span>' : ""}
            </div>
            <div style="font-size: 11px; color: #888; margin-top: 3px;">
              ${act.emoji} ${act.catTitle}
            </div>
          </div>
          <div style="font-weight: 900; font-size: 14px; color: ${isHigh ? "#D97706" : "#4B5563"};">
            ${act.score} 分
          </div>
        </div>
      `;
    }).join("");

    // Details sheets
    const detailsSheetsHtml = selectedDimensions.map((dimKey) => {
      const data = matrixData[dimKey];
      return `
        <div style="margin-top: 20px; page-break-inside: avoid;">
          <h4 style="font-size: 14px; color: #3C3A36; background-color: #EAE5D9; padding: 6px 12px; border-radius: 6px; margin: 0 0 10px 0;">
            📊 面向：${data.title}
          </h4>
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 12px; border: 1px solid #EAE5D9;">
            <thead>
              <tr style="background-color: #3C3A36; color: white;">
                <th style="padding: 6px; border: 1px solid #555;">需要的「生活變化」</th>
                ${data.actions.map(act => `<th style="padding: 6px; border: 1px solid #555; text-align: center;">${act}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${data.variations.map((rowName, rIdx) => `
                <tr style="border-bottom: 1px solid #EAE5D9;">
                  <td style="padding: 6px; border: 1px solid #EAE5D9; font-weight: bold; background-color: #FAF8F2; font-size: 11px;">${rowName}</td>
                  ${data.actions.map((_, aIdx) => {
                    const scoreVal = matrixScores[dimKey]?.[rIdx]?.[aIdx] ?? 0;
                    const char = scoreVal === 3 ? "○ (高)" : scoreVal === 1 ? "△ (中)" : "-";
                    const color = scoreVal === 3 ? "color: #EA580C; font-weight: bold;" : scoreVal === 1 ? "color: #2563EB;" : "color: #999;";
                    return `<td style="padding: 6px; border: 1px solid #EAE5D9; text-align: center; ${color}">${char}</td>`;
                  }).join("")}
                </tr>
              `).join("")}
              <tr style="background-color: #FAF5E8; font-weight: bold;">
                <td style="padding: 6px; border: 1px solid #EAE5D9; color: #9A3412;">⚖️ 行動累計權重總分</td>
                ${data.actions.map((_, aIdx) => {
                  const sum = getActionSum(dimKey, aIdx);
                  return `<td style="padding: 6px; border: 1px solid #EAE5D9; text-align: center; color: #EA580C; font-size: 13px;">${sum} 分</td>`;
                }).join("")}
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }).join("");

    const printHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>天職地圖-個人探索報告</title>
        <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;750&display=swap" rel="stylesheet" />
        <style>
          body {
            font-family: 'Zen Maru Gothic', 'PingFang TC', 'Heiti TC', 'Microsoft JhengHei', sans-serif;
            color: #3C3A36;
            background-color: #FDFBF7;
            padding: 30px;
            max-width: 820px;
            margin: 0 auto;
            line-height: 1.6;
          }
          h1, h2, h3, h4 {
            color: #3C3A36;
            margin-top: 0;
          }
          .title-area {
            text-align: center;
            border-bottom: 2px solid #E6A08A;
            padding-bottom: 20px;
            margin-bottom: 30px;
            page-break-after: avoid;
          }
          .badge {
            display: inline-block;
            background-color: #E6A08A;
            color: white;
            padding: 3px 12px;
            border-radius: 999px;
            font-size: 13px;
            font-weight: bold;
            margin-top: 5px;
          }
          .stage-title {
            border-left: 5px solid #E6A08A;
            padding-left: 12px;
            font-size: 20px;
            margin-top: 35px;
            margin-bottom: 15px;
            font-weight: bold;
            page-break-after: avoid;
          }
          .ai-quote {
            background-color: #FAF5E8;
            border: 1px dashed #E6A08A;
            border-radius: 16px;
            padding: 20px;
            margin-top: 15px;
            font-size: 14px;
            color: #3C3A36;
            line-height: 1.7;
            white-space: pre-wrap;
          }
          @media print {
            body {
              padding: 0;
              background-color: white !important;
            }
            .page-break {
              page-break-before: always;
            }
          }
        </style>
      </head>
      <body>
        <div class="title-area">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin: 0;">MISSION UNLOCKED</p>
          <h1 style="font-size: 28px; margin: 8px 0 5px 0; font-weight: bold;">🧭 天職地圖：理想未來導航報告</h1>
          <span class="badge">個人生活盤點與探索行動指南</span>
          <p style="font-size: 11px; color: #555; margin: 10px 0 0 0;">產出時間：${new Date().toLocaleDateString("zh-TW")} | 探索者：冒險者</p>
        </div>

        <div>
          <div class="stage-title">第一階段：1-1 理想生活樣貌藍圖</div>
          
          <h3 style="font-size: 16px; margin: 20px 0 10px 0; font-weight: bold; color: #8C6A5A;">🌟 前三核心價值觀排序</h3>
          ${valuesHtml}

          <h3 style="font-size: 16px; margin: 25px 0 10px 0; font-weight: bold; color: #8C6A5A;">🏡 物質欲望 (想獲得的理想生活)</h3>
          <table style="width: 100%; border-collapse: collapse; text-align: left; margin-bottom: 25px; border: 1px solid #EAE5D9;">
            ${materialHtml}
          </table>

          <h3 style="font-size: 16px; margin: 25px 0 10px 0; font-weight: bold; color: #8C6A5A;">🌿 精神欲望 (你想成為的樣子)</h3>
          <div style="background-color: #FAF8F2; border: 1px solid #EAE5D9; border-radius: 16px; padding: 20px;">
            <p style="margin: 0 0 12px 0; font-size: 13px;"><strong>Q1. 崇拜、尊敬的人：</strong> ${spiritualInputs.admired ? spiritualInputs.admired.replace(/\n/g, "<br/>") : "（未填寫）"}</p>
            <p style="margin: 0 0 12px 0; font-size: 13px;"><strong>Q2. 喜歡的角色與特質：</strong> ${spiritualInputs.characters ? spiritualInputs.characters.replace(/\n/g, "<br/>") : "（未填寫）"}</p>
            <p style="margin: 0 0 12px 0; font-size: 13px;"><strong>Q3. 希望成長到的模樣：</strong> ${spiritualInputs.childhood ? spiritualInputs.childhood.replace(/\n/g, "<br/>") : "（未填寫）"}</p>
            <p style="margin: 0 0 12px 0; font-size: 13px;"><strong>Q4. 終點的墓誌銘形容：</strong> ${spiritualInputs.epitaph ? spiritualInputs.epitaph.replace(/\n/g, "<br/>") : "（未填寫）"}</p>
            <p style="margin: 0; font-size: 13px;"><strong>Q5. 負面探索（絕對不想要的窒息感）：</strong> ${spiritualInputs.negative ? spiritualInputs.negative.replace(/\n/g, "<br/>") : "（未填寫）"}</p>
          </div>

          <h3 style="font-size: 16px; margin: 25px 0 10px 0; font-weight: bold; color: #8C6A5A; page-break-after: avoid;">🤖 AI 導航員：理想未來摘要</h3>
          <div class="ai-quote">
            ${aiResult || "（尚未進行 AI 導航分析收斂，快去點擊按鈕探索吧！）"}
          </div>
        </div>

        <div class="page-break">
          <div class="stage-title" style="margin-top: 0;">第二階段：1-2 想做的事與行動提案</div>
          
          <div style="background-color: #FAF8F2; border: 1px solid #E6A08A; border-radius: 12px; padding: 12px 20px; font-weight: bold; color: #E6A08A; margin-bottom: 20px; font-size: 14px; text-align: center;">
            🎯 預計實現目標時期：${timeframe || "（未填寫）"}
          </div>

          <h3 style="font-size: 16px; margin: 20px 0 10px 0; font-weight: bold; color: #8C6A5A;">🔥 全方位興致行動排行 (優先順序由高到低)</h3>
          <p style="font-size: 12px; color: #666; margin-top: 0; margin-bottom: 10px;">
            根據您在「需要的變化」與「興致方案」矩陣中的交叉評估，系統統計出最高累計權重的行動清單，前20%代表您內心最渴望立即展開的關鍵方案：
          </p>
          <div style="border: 1px solid #EAE5D9; border-radius: 12px; overflow: hidden; background-color: white;">
            ${scoredActionsHtml || '<p style="padding: 15px; text-align: center; color: #999; margin:0;">（目前尚無大於0分的行動指標，請在各面向矩陣評分）</p>'}
          </div>

          <h3 style="font-size: 16px; margin: 30px 0 10px 0; font-weight: bold; color: #8C6A5A; page-break-after: avoid;">📊 行動興致評分矩陣明細</h3>
          ${detailsSheetsHtml || '<p style="color: #999; font-size:13px;">（尚未圈選任何生活變化面向）</p>'}
        </div>

        <div style="margin-top: 50px; text-align: center; border-top: 1px solid #EAE5D9; padding-top: 20px; font-size: 12px; color: #888; page-break-inside: avoid;">
          <p>「當妳終於學會把眼睛放在自己的光芒上，整個世界的風，都會開始為妳伴奏。」</p>
          <p style="font-weight: bold; margin-top: 5px;">🗺️ 探索熱愛，勇敢啟程 • 天職地圖</p>
        </div>

        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(printHtml);
    printWindow.document.close();
  };

  const handleGenerateFinalCard = () => {
    if (selectedDimensions.length === 0) {
      setModalData({
        success: false,
        title: "尚未選擇面向",
        icon: "🤔",
        description: (
          <p className="text-gray-600 font-medium">
            冒險者，妳需要先在上方勾選「理想未來需要作出的生活變化面向」並完成評分，才能產出專屬卡牌喔！
          </p>
        )
      });
      setShowModal(true);
      return;
    }

    interface ScoredAction {
      name: string;
      score: number;
      dimKey: string;
      dimTitle: string;
      emoji: string;
    }

    const allScoredActions: ScoredAction[] = [];

    selectedDimensions.forEach((dimKey) => {
      const data = matrixData[dimKey];
      const scores = matrixScores[dimKey];
      if (!scores) return;

      const emoji = dimKey === "work" ? "💼" : dimKey === "love" ? "🧡" : dimKey === "health" ? "🌿" : "🪐";
      const catShortTitle = data.title.split(" (")[0] || data.title;

      data.actions.forEach((actName, aIdx) => {
        const score = getActionSum(dimKey, aIdx);
        if (score > 0) {
          allScoredActions.push({
            name: actName,
            score,
            dimKey,
            dimTitle: catShortTitle,
            emoji
          });
        }
      });
    });

    if (allScoredActions.length === 0) {
      setModalData({
        success: false,
        title: "尚未完成評分",
        icon: "📝",
        description: (
          <p className="text-gray-650">
            妳好像還沒有在下方的矩陣表格中填寫優先度 (○△X) 喔！請選出至少一個高優先度的行動。
          </p>
        )
      });
    } else {
      // Sort descending by score
      allScoredActions.sort((a, b) => b.score - a.score);

      // Determine top 20% count (rounded up, at least 1)
      const highlightCount = Math.max(1, Math.ceil(allScoredActions.length * 0.2));

      setModalData({
        success: true,
        title: "全方位想做的事清單",
        icon: "🌟",
        description: (
          <div className="space-y-4">
            {timeframe && (
              <p className="text-xs sm:text-sm font-bold text-[#E6A08A] mb-3 leading-relaxed bg-[#F7F4EC] p-2.5 rounded-lg border border-[#EAE5D9] text-center">
                🎯 設定實現目標時期：{timeframe}
              </p>
            )}
            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
              {allScoredActions.map((act, idx) => {
                const isHigh = idx < highlightCount;
                return (
                  <div
                    key={`${act.dimKey}-${act.name}`}
                    className={`flex justify-between items-center p-3 rounded-xl border transition-all text-left ${
                      isHigh
                        ? "bg-gradient-to-r from-amber-50 to-orange-50/80 border-amber-300 shadow-xs"
                        : "bg-white border-stone-200/60"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-slate-800 font-bold text-sm">
                          ✨ {act.name}
                        </span>
                        {isHigh && (
                          <span className="text-[9px] font-extrabold bg-amber-500 text-white px-1.5 py-0.5 rounded-md tracking-tight scale-90 sm:scale-100">
                            前20%指標
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold block mt-1">
                        {act.emoji} {act.dimTitle}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`font-black text-sm ${isHigh ? "text-orange-600" : "text-stone-700"}`}>
                        ({act.score}分)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      });
    }

    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3C3A36] pb-24 font-sans selection:bg-[#E6A08A]/30">
      
      {/* HEADER NAVIGATION TABS EXACTLY AS THE HTML VERSION */}
      <nav className="sticky top-0 z-40 bg-[#FDFBF7]/85 backdrop-blur-md border-b border-[#EAE5D9] shadow-sm mb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 overflow-x-auto scrollbar-none">
            <div className="flex space-x-2 sm:space-x-8 min-w-max px-2">
              <button
                type="button"
                onClick={() => switchTab("page1")}
                className={`px-3 py-4 text-sm sm:text-base whitespace-nowrap flex items-center gap-2 rounded-t-lg transition-all border-b-3 ${
                  activeTab === "page1"
                    ? "bg-[#F7F4EC] text-[#E6A08A] border-[#E6A08A] font-bold"
                    : "text-gray-400 border-transparent hover:text-[#3C3A36]"
                }`}
              >
                <span className="text-xl">🎮</span> 遊戲啟動
              </button>
              <button
                type="button"
                onClick={() => switchTab("page2")}
                className={`px-3 py-4 text-sm sm:text-base whitespace-nowrap flex items-center gap-2 rounded-t-lg transition-all border-b-3 ${
                  activeTab === "page2"
                    ? "bg-[#F7F4EC] text-[#E6A08A] border-[#E6A08A] font-bold"
                    : "text-gray-400 border-transparent hover:text-[#3C3A36]"
                }`}
              >
                <span className="text-xl">🏡</span> 1-1 理想生活
              </button>
              <button
                type="button"
                onClick={() => switchTab("page3")}
                className={`px-3 py-4 text-sm sm:text-base whitespace-nowrap flex items-center gap-2 rounded-t-lg transition-all border-b-3 ${
                  activeTab === "page3"
                    ? "bg-[#F7F4EC] text-[#E6A08A] border-[#E6A08A] font-bold"
                    : "text-gray-400 border-transparent hover:text-[#3C3A36]"
                }`}
              >
                <span className="text-xl">⚔️</span> 1-2 想做的事
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: INTRODUCTION & WORLDVIEW - EXACTLY EQUAL IN STRUCTURE, STYLE AND CONTENT */}
          {activeTab === "page1" && (
            <motion.div
              key="p1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#3C3A36]">遊戲啟動：閱讀世界觀</h1>
                <p className="text-gray-500">歡迎登入天職地圖，出發前請先領取妳的冒險觀念包。</p>
              </div>

              {/* Box 1 */}
              <div className="bg-[#F7F4EC] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#EAE5D9]">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="bg-[#E6A08A] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow">1</span> 
                  什麼是天職？
                </h2>
                <ul className="space-y-4 text-lg text-gray-700 leading-relaxed list-none pl-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E6A08A] mt-1.5 shrink-0">✦</span>
                    <p><strong>工作是為了人生，而人生非為了工作</strong>。天職的本質，是能夠「實現理想人生」的工作。</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E6A08A] mt-1.5 shrink-0">✦</span>
                    <p>這場工作坊不是要妳立刻回答「適合做什麼工作」，而是去探索妳「理想未來的樣貌」。</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E6A08A] mt-1.5 shrink-0">✦</span>
                    <p><strong>天職就好像探索一張寶藏圖</strong>：不需要一次找到標準答案，而是一邊探索自己，一邊畫出屬於自己的人生地圖。</p>
                  </li>
                </ul>
              </div>

              {/* Box 2 */}
              <div className="bg-[#F7F4EC] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#EAE5D9]">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="bg-[#E6A08A] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow">2</span> 
                  貫穿冒險的三大原則
                </h2>
                <p className="mb-6 text-gray-600">這三個最重要的核心觀念，會打破妳過往對「強項」的迷思：</p>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#EAE5D9]">
                    <h3 className="text-xl font-bold mb-2 text-[#3C3A36]">原則一：強項不是只有「才華」和「重大實績」</h3>
                    <p className="text-[#3C3A36] text-sm sm:text-base leading-relaxed mb-2"><strong>【白話解釋】</strong>：強項並不是指妳一定要拿過全公司第一名、或擁有天生當音樂家的才華。只要在達成目標過程中「對妳有利的特徵」，就是強項。</p>
                    <p className="text-gray-500 text-sm">💡 <strong>舉例</strong>：強項必須放在對的「目標」中判斷。目標是「當業務」，「愛聊天」是強項；目標是「當需要極度專注的工程師」，它可能就變成弱點。目標不同，裝備就不同。</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl border border-[#EAE5D9]">
                    <h3 className="text-xl font-bold mb-2 text-[#3C3A36]">原則二：每個人都一定擁有強項</h3>
                    <p className="text-[#3C3A36] text-sm sm:text-base leading-relaxed mb-2"><strong>【白話解釋】</strong>：這世上不存在「絕對最強」的技能。我們不用跟全世界競爭，而是看目前的「戰鬥目標」是什麼，再決定用什麼強項。</p>
                    <p className="text-gray-500 text-sm">💡 <strong>舉例</strong>：可以從最在意的「缺點」出發。例如「生性膽小」，放對地方反而是強大武器——代表妳「擅長危機管理、總是能做足萬全準備」。</p>
                    <div className="mt-4 pt-4 border-t border-stone-100">
                      <span className="text-xs bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200">
                        🧭 點擊下列卡片，翻轉妳在意的缺點成為主線強裝：
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
                        {weaknessesList.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setFlippedWeakness(flippedWeakness === item.id ? null : item.id)}
                            className={`p-3 rounded-xl border text-left transition-all h-24 flex flex-col items-center justify-center gap-1 overflow-hidden cursor-pointer ${
                              flippedWeakness === item.id
                                ? "bg-[#8A9A86]/10 border-[#8A9A86]"
                                : "bg-[#FDFBF7] border-stone-200 hover:border-[#E6A08A]"
                            }`}
                          >
                            {flippedWeakness === item.id ? (
                              <div className="text-slate-800 text-[10px] sm:text-xs leading-normal">
                                <span className="font-extrabold text-[#8A9A86] block text-center mb-0.5">🌟 強項屬性：</span>
                                {item.strength}
                              </div>
                            ) : (
                              <div className="text-center">
                                <span className="text-[10px] text-gray-400 block mb-1">缺點狀態</span>
                                <span className="font-bold text-[#3C3A36] text-xs sm:text-sm">{item.name}</span>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#EAE5D9]">
                    <h3 className="text-xl font-bold mb-2 text-[#3C3A36]">原則三：強項可以不受限制地增加</h3>
                    <p className="text-[#3C3A36] text-sm sm:text-base leading-relaxed mb-2"><strong>【白話解釋】</strong>：強項分類很廣，有很多是隨時可以擴充的「後天技能」與「外在道具」。</p>
                    <div className="text-gray-500 text-sm bg-gray-50 p-4 rounded-xl mt-3">
                      <p className="font-bold mb-1">強項三大類：</p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li><strong>資質（基本裝備）</strong>：外表、個性。</li>
                        <li><strong>後天（習得咒術）</strong>：經驗、知識、技能、實績。</li>
                        <li><strong>資源（隨身道具）</strong>：時間、金錢、物品、人脈。</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 3 */}
              <div className="bg-[#F7F4EC] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#EAE5D9]">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><span className="bg-[#E6A08A] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow">3</span> 七天路徑總覽</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                            <tr className="bg-[#EAE5D9] text-[#3C3A36]">
                                <th className="p-3 rounded-tl-xl font-bold">階段</th>
                                <th className="p-3 font-bold">天數</th>
                                <th className="p-3 font-bold">任務</th>
                                <th className="p-3 rounded-tr-xl font-bold">核心問題</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 bg-white">
                            <tr className="border-b border-[#EAE5D9]">
                                <td className="p-3 font-medium text-[#E6A08A]">設定目標</td>
                                <td className="p-3">Day 1</td>
                                <td className="p-3 font-bold text-stone-800">理想未來</td>
                                <td className="p-3">我想去哪裡？</td>
                            </tr>
                            <tr className="border-b border-[#EAE5D9]">
                                <td className="p-3 font-medium text-[#E6A08A]">設定目標</td>
                                <td className="p-3">Day 2</td>
                                <td className="p-3 font-bold text-stone-800">想做的事</td>
                                <td className="p-3">我要先挑戰哪個關卡？</td>
                            </tr>
                            <tr className="border-b border-[#EAE5D9] text-gray-500">
                                <td className="p-3">盤點裝備</td>
                                <td className="p-3">Day 3</td>
                                <td className="p-3">資質強項</td>
                                <td className="p-3">我天生有什麼特徵？</td>
                            </tr>
                            <tr className="border-b border-[#EAE5D9] text-gray-500">
                                <td className="p-3">盤點裝備</td>
                                <td className="p-3">Day 4</td>
                                <td className="p-3">後天強項</td>
                                <td className="p-3">我後天累積了什麼？</td>
                            </tr>
                            <tr className="border-b border-[#EAE5D9] text-gray-500">
                                <td className="p-3">盤點裝備</td>
                                <td className="p-3">Day 5</td>
                                <td className="p-3">資源強項</td>
                                <td className="p-3">我手上有哪些道具？</td>
                            </tr>
                            <tr className="border-b border-[#EAE5D9] text-gray-500">
                                <td className="p-3">畫出地圖</td>
                                <td className="p-3">Day 6</td>
                                <td className="p-3">天職地圖</td>
                                <td className="p-3">我要怎麼走到終點？</td>
                            </tr>
                            <tr className="text-gray-500">
                                <td className="p-3 rounded-bl-xl">畫出地圖</td>
                                <td className="p-3">Day 7</td>
                                <td className="p-3">作戰策略</td>
                                <td className="p-3 rounded-br-xl">遇到阻礙時怎麼應戰？</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </div>

              <div className="flex justify-center mt-12 pb-8">
                <button
                  type="button"
                  onClick={() => switchTab("page2")}
                  className="bg-[#E6A08A] hover:bg-[#D58F79] text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg transform transition hover:-translate-y-1 cursor-pointer flex items-center gap-2"
                >
                  🧭 觀念已輸入，準備啟程！
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: IDEAL LIFE BLUEPRINT - EXACTLY PORTED FROM THE HTML STRUCTURE */}
          {activeTab === "page2" && (
            <motion.div
              key="p2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#3C3A36]">1-1 找到理想生活的樣貌</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">把大腦裡的模糊想像，具現化成可以看見的未來地圖。</p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border-l-4 border-[#E6A08A] shadow-sm mb-10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">📜 本關核心任務（MISSION）</h3>
                <p className="text-gray-700 leading-relaxed mb-4">一個具體且讓人充滿動力的「理想未來」，是由以下公式組合而成的：</p>
                <div className="bg-[#F7F4EC] p-4 sm:p-6 rounded-xl text-center font-bold text-lg sm:text-xl text-[#3C3A36] mb-4 shadow-inner">
                  理想的未來 = 想獲得的東西 <span className="text-sm font-normal text-gray-500">(物質欲望)</span> + 想成為的樣貌 <span className="text-sm font-normal text-gray-500">(精神欲望)</span>
                </div>
                <ul className="text-gray-600 space-y-3 text-sm sm:text-base bg-gray-50 p-4 rounded-lg list-none">
                  <li>• <strong className="text-[#3C3A36]">想獲得的東西 (物質欲望)：</strong>外在需求，如收入、時間、自由、生活品質。</li>
                  <li>• <strong className="text-[#3C3A36]">想成為的樣貌 (精神欲望)：</strong>內在狀態，如自信、被信任、有影響力、幫助他人。</li>
                </ul>
              </div>

              {/* Step 1: Values */}
              <div className="bg-[#F7F4EC] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#EAE5D9]">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="bg-[#E6A08A] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow">步驟 1</span> 
                  價值觀排序
                </h2>
                <p className="text-gray-600 mb-4">請自以下價值觀關鍵字中挑選（可點擊下方標籤快速選取或自由新增）。請排出前三名的優先順序，並寫下重視的原因或背後的關鍵回憶。</p>
                
                {/* Dictionary block */}
                <div className="bg-white p-5 rounded-xl border border-[#EAE5D9] mb-6 shadow-sm">
                  <div className="flex items-start gap-2 mb-4 bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <span className="bg-[#E6A08A] text-white text-xs font-bold px-2 py-1 rounded">提示</span>
                    <p className="text-sm text-gray-700 font-medium">
                      以下關鍵字解釋僅是舉例，大家可自行針對關鍵字有自己的定義與詮釋。五個解釋如下：
                    </p>
                  </div>
                  
                  <div className="space-y-3 px-1 text-sm text-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 pb-3 border-b border-gray-100">
                      <span className="font-bold text-[#E6A08A] min-w-[100px] inline-block">地位 / 肯定</span>
                      <span className="text-stone-600">想成為被稱讚的那方／想獲得肯定／不想屈居他人之下。</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 pb-3 border-b border-gray-100">
                      <span className="font-bold text-[#E6A08A] min-w-[100px] inline-block">成長 / 進步</span>
                      <span className="text-stone-600">想持續精進專業與能力／不想停止學習與踏步不前。</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 pb-3 border-b border-gray-100">
                      <span className="font-bold text-[#E6A08A] min-w-[100px] inline-block">挑戰 / 冒險</span>
                      <span className="text-stone-600">想跳出舒適圈挑戰未知／想享受克服困難時的成就感。</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 pb-3 border-b border-gray-100">
                      <span className="font-bold text-[#E6A08A] min-w-[100px] inline-block">創意 / 獨特</span>
                      <span className="text-stone-600">想發揮個人想像與獨特靈感／不想做一成不變的公式化事情。</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 pb-1">
                      <span className="font-bold text-[#E6A08A] min-w-[100px] inline-block">影響力</span>
                      <span className="text-stone-600">想讓自己的想法被看見與認同／想引引導、啟發並改變他人。</span>
                    </div>
                  </div>
                </div>

                {/* Values Selection Tags Pool */}
                <div id="value-tags-container" className="flex flex-wrap gap-2 mb-8 bg-white p-4 rounded-xl border border-[#EAE5D9]">
                  {valuesPool.map((val) => {
                    const isSelected = topValues.some((slot) => slot.name === val);
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => {
                          const emptyIdx = topValues.findIndex((slot) => !slot.name);
                          if (emptyIdx !== -1) {
                            handleSelectValueForRank(val, emptyIdx);
                          }
                        }}
                        disabled={isSelected}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition ${
                          isSelected
                            ? "bg-stone-50 text-stone-300 border-stone-200 cursor-not-allowed"
                            : "bg-gray-100 text-stone-700 border-transparent hover:bg-stone-200"
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => {
                      const val = prompt("請輸入妳自訂的價值觀關鍵字：");
                      if (val && val.trim() !== "") {
                        const word = val.trim();
                        if (!valuesPool.includes(word)) {
                          setValuesPool([...valuesPool, word]);
                        }
                      }
                    }}
                    className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-xs font-bold cursor-pointer hover:bg-blue-100 transition"
                  >
                    + 自訂義
                  </button>
                </div>

                {/* Values Scoring Cards Inputs */}
                <div className="space-y-4">
                  {topValues.map((rank, rankIdx) => {
                    const medalNames = ["👑 第一名", "第二名", "第三名"];
                    const placeholders = [
                      "例如：從小家裡... / 曾經因為...",
                      "例如：過去工作常加班，所以...",
                      "例如：總是在意別人的眼光，希望未來能..."
                    ];
                    return (
                      <div key={rankIdx} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-[#EAE5D9]">
                        <div className="w-full md:w-1/4">
                          <label className="block text-sm font-bold text-[#E6A08A] mb-1">
                            {medalNames[rankIdx]}
                          </label>
                          <div className="flex gap-1.5 items-center">
                            <input
                              type="text"
                              value={rank.name}
                              onChange={(e) => {
                                const updated = [...topValues];
                                updated[rankIdx] = { name: e.target.value, reason: updated[rankIdx].reason };
                                setTopValues(updated);
                              }}
                              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#E6A08A] focus:outline-none bg-[#FDFBF7]"
                              placeholder="選擇或輸入關鍵字"
                            />
                            {rank.name && (
                              <button
                                type="button"
                                onClick={() => handleClearRank(rankIdx)}
                                className="text-gray-400 hover:text-gray-650 p-1"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="w-full md:w-3/4">
                          <label className="block text-sm font-bold text-gray-500 mb-1">
                            為什麼重視？(關鍵回憶/原因)
                          </label>
                          <textarea
                            rows={2}
                            value={rank.reason}
                            onChange={(e) => handleUpdateReason(rankIdx, e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#E6A08A] focus:outline-none custom-scrollbar"
                            placeholder={placeholders[rankIdx]}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Material Desires */}
              <div className="bg-[#F7F4EC] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#EAE5D9]">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <span className="bg-[#E6A08A] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow">步驟 2</span> 
                  你想獲得什麼？(物質欲望)
                </h2>
                <p className="text-gray-650 mb-6 text-sm">
                  請按照下表的項目，任意寫下你「想獲得的理想生活」（就算只寫心有所感的項目也沒關係）。<br />
                  <span className="text-[#E6A08A] font-bold">💡 點擊下方小標籤可選取畫面（按鈕會變橘色），下方的對話框請保留給妳輸入「其他專屬畫面」。</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(Object.entries(materialCategories) as [string, MaterialCategory][]).map(([key, cat]) => {
                    const isLongRow = key === "favoriteItems" || key === "timeFinancial";
                    return (
                      <div key={key} className={isLongRow ? "md:col-span-2" : ""}>
                        <label className="block font-bold text-[#3C3A36] mb-2">{cat.title}</label>
                        <div className="mb-2 flex flex-wrap gap-1.5">
                          {cat.tags.map((tag) => {
                            const isChosen = cat.selection.includes(tag);
                            return (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => handleToggleMaterialTag(key, tag)}
                                className={`text-xs px-2.5 py-1 border rounded-full font-medium cursor-pointer transition ${
                                  isChosen
                                    ? "bg-[#E6A08A] text-white border-[#E6A08A] shadow-sm"
                                    : "bg-gray-100 text-[#4b5563] border-stone-200/80 hover:bg-[#EAE5D9]/50"
                                }`}
                              >
                                {tag}
                              </button>
                            );
                          })}
                        </div>
                        <textarea
                          rows={1}
                          value={cat.customText}
                          onChange={(e) => handleUpdateMaterialCustom(key, e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#E6A08A] focus:outline-none custom-scrollbar"
                          placeholder={cat.placeholder}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Spiritual Desires */}
              <div className="bg-[#F7F4EC] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#EAE5D9]">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <span className="bg-[#E6A08A] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow">步驟 3</span> 
                  你想變成什麼樣子？(精神欲望)
                </h2>
                <p className="text-gray-650 mb-2 text-sm">請根據提示與範例，穿越時空回答內心的精神渴望。</p>
                <p className="text-[#E6A08A] font-bold mb-6 text-sm">※ 如果以下內容都不只一位，請分別寫下後再找出共通點。</p>

                <div className="space-y-6">
                  {/* Q1 */}
                  <div className="bg-white p-5 rounded-2xl border border-[#EAE5D9]">
                    <h4 className="font-bold text-[#E6A08A] mb-2">Q1：崇拜、尊敬的人</h4>
                    <p className="text-xs text-gray-500 mb-2">妳崇拜或尊敬的人是誰？喜歡那個人的什麼地方？<br />
                    <span className="italic text-gray-400">💡 範例：媽媽（笑臉迎人，聊天就充滿精神）；鈴木主管（嚴肅會議後講笑話引導動機）。共通點是「和他們談話就能打起精神」。</span></p>
                    <textarea
                      rows={2}
                      value={spiritualInputs.admired}
                      onChange={(e) => handleUpdateSpiritualInput("admired", e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#E6A08A] focus:outline-none custom-scrollbar"
                      placeholder="例如：我崇拜我的前主管，因為他總能冷靜解決危機..."
                    />
                  </div>

                  {/* Q2 */}
                  <div className="bg-white p-5 rounded-2xl border border-[#EAE5D9]">
                    <h4 className="font-bold text-[#E6A08A] mb-2">Q2：喜歡的角色</h4>
                    <p className="text-xs text-gray-500 mb-2">作品中有沒有妳喜歡的角色？喜歡他的什麼特質？<br />
                    <span className="italic text-gray-400">💡 範例：海賊王的魯夫。無論危機多大都格外開朗，為同伴加油。</span></p>
                    <textarea
                      rows={2}
                      value={spiritualInputs.characters}
                      onChange={(e) => handleUpdateSpiritualInput("characters", e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#E6A08A] focus:outline-none custom-scrollbar"
                      placeholder="例如：我喜歡鋼鐵人，因為他幽默且勇於承擔責任..."
                    />
                  </div>

                  {/* Q3 */}
                  <div className="bg-white p-5 rounded-2xl border border-[#EAE5D9]">
                    <h4 className="font-bold text-[#E6A08A] mb-2">Q3：過去（童年回溯）</h4>
                    <p className="text-xs text-gray-500 mb-2">如果遇到孩提時代的妳，妳希望他成長為什麼樣的大人？<br />
                    <span className="italic text-gray-400">💡 範例：希望他成為無論何時都帶著笑容，像太陽一般帶給別人活力的人。</span></p>
                    <textarea
                      rows={2}
                      value={spiritualInputs.childhood}
                      onChange={(e) => handleUpdateSpiritualInput("childhood", e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#E6A08A] focus:outline-none custom-scrollbar"
                      placeholder="例如：希望他能保持對世界的好奇心，不要害怕犯錯..."
                    />
                  </div>

                  {/* Q4 */}
                  <div className="bg-white p-5 rounded-2xl border border-[#EAE5D9]">
                    <h4 className="font-bold text-[#E6A08A] mb-2">Q4：未來（墓誌銘效應）</h4>
                    <p className="text-xs text-gray-500 mb-2">來到人生最後，妳希望參加葬禮的朋友如何形容妳？<br />
                    <span className="italic text-gray-400">💡 範例：希望別人說我是「和她聊天就會充滿精神，像能量景點一樣的人」。</span></p>
                    <textarea
                      rows={2}
                      value={spiritualInputs.epitaph}
                      onChange={(e) => handleUpdateSpiritualInput("epitaph", e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#E6A08A] focus:outline-none custom-scrollbar"
                      placeholder="例如：她是一個總是能給人帶來溫暖 and 靈感的人..."
                    />
                  </div>

                  {/* Q5 */}
                  <div className="bg-[#FAF2EE] p-5 rounded-2xl border border-[#D58F79]/50 mt-8">
                    <h4 className="font-bold text-[#3C3A36] mb-2 flex items-center gap-2">
                      <span className="text-xl">⚠️</span> Q5：負面探索（我不想要再遇到什麼）
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      回想過往最痛苦、最想逃離的時刻是什麼？妳絕對不想再經歷什麼？<br />
                      <span className="text-orange-500 font-bold">提示：痛苦裡往往藏著妳最重視的核心價值。</span>
                    </p>
                    <textarea
                      rows={3}
                      value={spiritualInputs.negative}
                      onChange={(e) => handleUpdateSpiritualInput("negative", e.target.value)}
                      className="w-full p-3 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none custom-scrollbar bg-white"
                      placeholder="例如：我絕對不想再經歷每天被情緒勒索、連假日都要回覆工作訊息的窒息感..."
                    />
                  </div>
                </div>
              </div>

              {/* AI Guidance Block */}
              <div className="text-center pb-8 pt-4 space-y-6">
                {!aiLoading && !aiResult && (
                  <button
                    type="button"
                    onClick={generateAISummary}
                    className="bg-stone-800 hover:bg-stone-700 text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:-translate-y-1 flex items-center gap-2.5 mx-auto cursor-pointer"
                  >
                    <span>🤖</span> AI 導航員：收斂我的理想未來
                  </button>
                )}

                {aiLoading && (
                  <div className="flex flex-col items-center justify-center gap-3 text-stone-500 py-6">
                    <Loader2 className="animate-spin h-8 w-8 text-[#E6A08A] block" />
                    <p className="animate-pulse text-sm font-medium">{aiLoadingPhase}</p>
                  </div>
                )}

                {aiResult && !aiLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-[#fffaf9] to-[#F7F4EC] p-6 sm:p-10 rounded-3xl shadow-md border border-[#E6A08A]/30 max-w-3xl mx-auto text-left relative overflow-hidden"
                  >
                    <div className="absolute -top-10 -right-10 text-[100px] opacity-5 select-none pointer-events-none">✨</div>
                    <div className="flex justify-between items-center border-b border-[#E6A08A]/25 pb-2 mb-4">
                      <h3 className="text-xl font-bold text-[#E6A08A] flex items-center gap-1.5">📜 妳的具象化未來樣貌</h3>
                      <button
                        type="button"
                        onClick={generateAISummary}
                        className="text-xs text-stone-500 hover:text-stone-700 bg-white/85 px-2.5 py-1 rounded-full border border-stone-200 font-bold flex items-center gap-1 cursor-pointer transition"
                      >
                        <RotateCw className="w-3 h-3 text-[#E6A08A]" /> 重新生成
                      </button>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-medium whitespace-pre-wrap">
                      {aiResult}
                    </p>

                    <div className="mt-8 p-4 bg-white/70 rounded-xl border border-white text-center">
                      <p className="text-xs text-gray-600 font-bold">🌉 看清終點了！為了靠近它，現在可以做些什麼呢？</p>
                    </div>

                    <div className="flex justify-center mt-6">
                      <button
                        type="button"
                        onClick={() => switchTab("page3")}
                        className="bg-[#E6A08A] hover:bg-[#D58F79] text-white font-bold py-3 px-8 rounded-full shadow transition hover:-translate-y-0.5 cursor-pointer flex items-center gap-1"
                      >
                        🏡 前進下一關：設定想做的事
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: THINGS I WANT TO DO & DYNAMIC MATRIX - PERFECTLY RESTORED FROM HTML */}
          {activeTab === "page3" && (
            <motion.div
              key="p3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#3C3A36]">1-2 釐清想做的事</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">尋找達成理想的手段，用玩遊戲解任務的心態來設定吧！</p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border-l-4 border-[#8A9A86] shadow-sm mb-10">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">📜 本關核心任務（MISSION）</h3>
                <ul className="text-gray-700 space-y-2 leading-relaxed list-disc pl-5">
                  <li>妳要找的<strong>「想做的事」</strong>，本質上只是<strong>「達成未來理想的手段」</strong>。</li>
                  <li>手段不分大小、不分多寡，中途想要隨時更換都完全 OK！</li>
                </ul>
              </div>

              <div className="bg-[#F7F4EC] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#EAE5D9] space-y-10">
                
                {/* Step 1 */}
                <div className="space-y-2">
                  <h2 className="text-xl font-bold mb-3 flex items-center gap-3">
                    <span className="bg-[#3C3A36] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow">1</span> 
                    決定「實現時期」
                  </h2>
                  <div className="bg-white p-4 rounded-xl border border-[#EAE5D9] flex items-center gap-4 flex-wrap">
                    <span className="text-gray-600 font-medium text-sm sm:text-base">預計在</span>
                    <input
                      type="text"
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="flex-1 min-w-[200px] p-2 border-b-2 border-gray-300 focus:border-[#E6A08A] focus:outline-none bg-transparent font-bold text-lg text-center text-stone-850"
                      placeholder="例如：兩年後的 6 月"
                    />
                    <span className="text-gray-600 font-medium text-sm sm:text-base">實現我的理想未來。</span>
                  </div>
                </div>

                {/* Step 2: Choose Life Dimensions (4 Dimensions Checkboxes) */}
                <div className="space-y-2">
                  <h2 className="text-xl font-bold mb-2 flex items-center gap-3">
                    <span className="bg-[#3C3A36] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow">2</span> 
                    決定理想未來需要作出的「生活變化」
                  </h2>
                  <p className="text-[#E6A08A] mb-4 text-xs font-bold">※ 如果答案不只一個，可以圈選好幾個。</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Work */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => toggleDimension("work")}
                        className={`w-full text-left cursor-pointer flex flex-col h-full bg-white p-5 rounded-2xl border-2 transition shadow-sm ${
                          selectedDimensions.includes("work") ? "border-[#E6A08A] bg-[#fffaf9]" : "border-stone-150/70 hover:border-[#E6A08A]/50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2 w-full">
                          <h4 className="font-bold text-[#3C3A36] text-sm sm:text-base">💼 職涯與工作 (Work)</h4>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            selectedDimensions.includes("work") ? "bg-[#E6A08A] border-[#E6A08A]" : "border-gray-300"
                          }`}>
                            {selectedDimensions.includes("work") && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                          </div>
                        </div>
                        <div className="mt-auto text-xs sm:text-sm text-gray-600">
                          想在世界揮灑什麼？（例如：收入、專業成就、發揮影響力、轉換產業）。
                        </div>
                      </button>
                    </div>

                    {/* Love */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => toggleDimension("love")}
                        className={`w-full text-left cursor-pointer flex flex-col h-full bg-white p-5 rounded-2xl border-2 transition shadow-sm ${
                          selectedDimensions.includes("love") ? "border-[#E6A08A] bg-[#fffaf9]" : "border-stone-150/70 hover:border-[#E6A08A]/50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2 w-full">
                          <h4 className="font-bold text-[#3C3A36] text-sm sm:text-base">🧡 關係與社群 (Love)</h4>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            selectedDimensions.includes("love") ? "bg-[#E6A08A] border-[#E6A08A]" : "border-gray-300"
                          }`}>
                            {selectedDimensions.includes("love") && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                          </div>
                        </div>
                        <div className="mt-auto text-xs sm:text-sm text-gray-600">
                          想與誰共度生活？（例如：家庭、伴侶、寵物、只和喜歡的人來往）。
                        </div>
                      </button>
                    </div>

                    {/* Health */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => toggleDimension("health")}
                        className={`w-full text-left cursor-pointer flex flex-col h-full bg-white p-5 rounded-2xl border-2 transition shadow-sm ${
                          selectedDimensions.includes("health") ? "border-[#E6A08A] bg-[#fffaf9]" : "border-stone-150/70 hover:border-[#E6A08A]/50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2 w-full">
                          <h4 className="font-bold text-[#3C3A36] text-sm sm:text-base">🌿 健康與身心 (Health)</h4>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            selectedDimensions.includes("health") ? "bg-[#E6A08A] border-[#E6A08A]" : "border-gray-300"
                          }`}>
                            {selectedDimensions.includes("health") && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                          </div>
                        </div>
                        <div className="mt-auto text-xs sm:text-sm text-gray-600">
                          想擁有多麼樣的載體？（例如：調整作息、追求美貌年輕、保持精神飽滿）。
                        </div>
                      </button>
                    </div>

                    {/* Play/Self */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => toggleDimension("play")}
                        className={`w-full text-left cursor-pointer flex flex-col h-full bg-white p-5 rounded-2xl border-2 transition shadow-sm ${
                          selectedDimensions.includes("play") ? "border-[#E6A08A] bg-[#fffaf9]" : "border-stone-150/70 hover:border-[#E6A08A]/50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2 w-full">
                          <h4 className="font-bold text-[#3C3A36] text-sm sm:text-base">🪐 內在與自我 (Play/Self)</h4>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            selectedDimensions.includes("play") ? "bg-[#E6A08A] border-[#E6A08A]" : "border-gray-300"
                          }`}>
                            {selectedDimensions.includes("play") && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                          </div>
                        </div>
                        <div className="mt-auto text-xs sm:text-sm text-gray-600">
                          想如何滋養靈魂？（例如：投入興趣、喜歡上自己、時間自由、學習新技能）。
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 3: Matrices Container (Only renders for checked slots) */}
                {selectedDimensions.length > 0 && (
                  <div className="space-y-8 animate-[fadeIn_0.3s_ease-out_forwards]">
                    <div className="border-t border-[#EAE5D9] pt-6 space-y-1">
                      <h2 className="text-xl font-bold flex items-start gap-3">
                        <span className="bg-[#3C3A36] text-white w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm shadow">3</span> 
                        整體性行動評分矩陣 (多面向獨立對照)
                      </h2>
                      <p className="text-gray-600 text-xs sm:text-sm block">
                        請針對剛剛圈選的面向，在下方獨立生成的表格中填寫對應行動的優先度。<br />
                        （○為優先度高 / 3分，△為優先度中 / 1分，X為優先度低 / 0分）
                      </p>
                    </div>

                    <div className="space-y-8">
                      {selectedDimensions.map((dimKey) => {
                        const data = matrixData[dimKey];
                        return (
                          <div key={dimKey} className="bg-white rounded-xl shadow-sm border border-[#EAE5D9] overflow-hidden">
                            <div className="bg-[#E6A08A] text-white px-5 py-3 font-bold text-base sm:text-lg border-b border-[#D58F79] flex justify-between items-center">
                              <span>{data.title} 面向專屬矩陣</span>
                            </div>
                            <div className="overflow-x-auto custom-scrollbar">
                              <table className="w-full text-xs sm:text-sm text-center border-collapse min-w-[600px]">
                                <thead>
                                  <tr className="bg-[#3C3A36] text-white">
                                    <th className="w-1/4 bg-[#3C3A36] p-3 text-left font-bold border border-[#555]">需要的「生活變化」</th>
                                    {data.actions.map((act) => (
                                      <th key={act} className="bg-[#3C3A36] border border-[#555] font-bold p-2 text-xs sm:text-sm leading-tight">{act}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.variations.map((rowName, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-stone-50/50">
                                      <td className="font-bold bg-[#f9f9f9] text-xs sm:text-sm p-3 text-left border border-[#EAE5D9] text-[#3C3A36]">{rowName}</td>
                                      {data.actions.map((_, aIdx) => {
                                        const currentScore = matrixScores[dimKey]?.[rIdx]?.[aIdx] ?? 0;
                                        return (
                                          <td key={aIdx} className="bg-white border border-[#EAE5D9] p-1">
                                            <select
                                              value={currentScore}
                                              onChange={(e) =>
                                                handleScoreChange(dimKey, rIdx, aIdx, parseInt(e.target.value))
                                              }
                                              className="appearance-none bg-transparent border border-gray-300 rounded-md py-1 px-0.5 text-xs sm:text-sm cursor-pointer text-center text-last-center w-full min-w-[70px] focus:outline-none focus:border-[#E6A08A]"
                                            >
                                              <option value={0}>-</option>
                                              <option value={3} className="text-orange-500 font-bold">○ (高)</option>
                                              <option value={1} className="text-blue-500">△ (中)</option>
                                              <option value={0} className="text-gray-500">X (低)</option>
                                            </select>
                                          </td>
                                        );
                                      })}
                                    </tr>
                                  ))}
                                  {/* Cumulative score row */}
                                  <tr className="bg-[#FAF8F2] border-t-2 border-[#EAE5D9]">
                                    <td className="p-3 text-left font-black text-rose-800 bg-[#FAF8F2] border border-[#EAE5D9]">
                                      ⚖️ 行動累計權重總分
                                    </td>
                                    {data.actions.map((_, aIdx) => {
                                      const sum = getActionSum(dimKey, aIdx);
                                      return (
                                        <td key={aIdx} className="p-3 font-extrabold text-stone-800 border border-[#EAE5D9] text-sm">
                                          <span className={sum > 0 ? "text-[#E6A08A]" : "text-gray-400"}>
                                            {sum} 分
                                          </span>
                                        </td>
                                      );
                                    })}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Generate Action Card Button */}
                <div className="pt-8 text-center border-t border-[#EAE5D9]">
                  <button
                    type="button"
                    onClick={handleGenerateFinalCard}
                    className="bg-[#E6A08A] hover:bg-[#D58F79] text-white text-lg sm:text-xl font-bold py-4 px-10 rounded-full shadow-xl transform transition hover:scale-105 cursor-pointer"
                  >
                    ✨ 計算總分，產出全方位行動清單
                  </button>
                </div>

                {/* Download Report Section */}
                <div className="mt-8 pt-8 border-t border-[#EAE5D9]">
                  <div className="bg-[#FAF8F2] rounded-2xl p-6 border border-[#EAE5D9]/80 shadow-xs max-w-xl mx-auto">
                    <h4 className="text-md font-bold text-[#3C3A36] mb-2 flex items-center justify-center gap-2 font-black">
                      <span className="text-xl">💾</span> 儲存妳的探索旅程報告
                    </h4>
                    <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                      您可以將「1-1理想生活藍圖」與「1-2想做的事行動評分」完整記錄整合儲存下來，隨時翻閱查看您的天職地圖。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <button
                        type="button"
                        onClick={handleDownloadTxt}
                        className="w-full sm:w-auto bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-bold py-2.5 px-6 rounded-full shadow-xs text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        📄 下載完整文字檔 (.txt)
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadPdf}
                        className="w-full sm:w-auto bg-[#3C3A36] hover:bg-[#2C2A26] text-white font-bold py-2.5 px-6 rounded-full shadow-md text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        🖨️ 列印或儲存為 PDF 報告
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* OVERLAY MODAL FOR FINAL ACTION CARD - MATCHING THE DESIGN PRINCIPLE PRECISELY */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FDFBF7] rounded-3xl shadow-2xl w-full max-w-md transform transitionrelative overflow-hidden z-10 border border-[#EAE5D9] text-center"
            >
              {/* decorative header */}
              <div className="h-24 bg-gradient-to-r from-[#E6A08A] to-[#e8b1a0] relative">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition cursor-pointer"
                >
                  <svg className="w-5 h-5 block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#FDFBF7] rounded-full flex items-center justify-center shadow-md border-4 border-[#FDFBF7]">
                  <span className="text-4xl">{modalData.icon}</span>
                </div>
              </div>

              <div className="pt-14 pb-8 px-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#E6A08A] tracking-widest mb-1">MISSION UNLOCKED</p>
                  <h2 className="text-2xl font-bold text-[#3C3A36] mb-4">
                    {modalData.title}
                  </h2>
                  
                  <div className="bg-white p-5 rounded-xl border border-dashed border-[#d1d5db] text-left mb-6 relative transition">
                    <div className="absolute -left-2 -top-2 bg-[#3C3A36] text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                      妳的全方位關卡
                    </div>
                    <div className="text-gray-700 leading-relaxed font-medium mt-2 text-sm">
                      {modalData.description}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-6 italic">
                  「這就是經過整體性評估後，最適合妳的全方位關卡清單！想改隨時可以改！」
                </p>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full bg-[#3C3A36] hover:bg-black text-white font-bold py-3 rounded-xl transition cursor-pointer text-sm"
                >
                  收下卡牌，準備盤點裝備
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  // Tab switching slide scroll helper
  function switchTab(targetId: "page1" | "page2" | "page3") {
    setActiveTab(targetId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
