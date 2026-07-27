/**
 * ワークフローで扱う成果物（アーティファクト）関連の型定義。
 */

/** ワークフロー定義や報告で指定する、成果物の入力情報。 */
export interface ArtifactInput {
  key: string;
  path: string;
}

/** データベースに永続化された成果物のレコード。 */
export interface ArtifactRecord {
  id: number;
  sessionId: string;
  stepKey: string;
  artifactKey: string;
  filePath: string;
  createdAt: string;
}
