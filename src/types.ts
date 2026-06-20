/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ValueRank {
  name: string;
  reason: string;
}

export interface MaterialCategory {
  title: string;
  tags: string[];
  selection: string[];
  customText: string;
  placeholder: string;
}

export interface SpiritualInputs {
  admired: string;
  characters: string;
  childhood: string;
  epitaph: string;
  negative: string;
}

export interface MatrixDefinition {
  title: string;
  actions: string[];
  variations: string[];
}

export interface MatrixScores {
  [dimensionKey: string]: {
    [variationIdx: number]: {
      [actionIdx: number]: number; // 0 = -, 1 = △ (1 point), 3 = ○ (3 points)
    }
  };
}
