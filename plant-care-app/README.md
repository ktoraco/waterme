# Plant Care App

## 概要
Plant Care Appは、植物の水やり管理をサポートするアプリケーションです。ユーザーは自分の植物を登録し、水やりのスケジュールを管理することができます。カレンダー機能を通じて、いつ水やりを行うべきかを一目で確認でき、植物の成長を記録するための詳細ページも用意されています。

## 機能
- **植物リスト**: 登録した植物の一覧を表示します。
- **水やり通知**: 今日の水やりが必要な植物を通知します。
- **カレンダービュー**: 水やり予定をカレンダー形式で表示します。
- **植物詳細ページ**: 各植物の基本情報や水やり履歴、写真メモを確認できます。
- **植物追加フォーム**: 新しい植物を簡単に追加できます。

## 技術スタック
- **Next.js**: ルーティングとデプロイが簡単。
- **React**: UI構築の基本。
- **TypeScript**: 型安全性を提供し、保守性を向上。
- **Tailwind CSS**: スタイリングを簡単に行い、ネイティブアプリのような見た目を実現。
- **Zustand**: シンプルな状態管理。
- **date-fns**: 日付処理を強化。
- **localStorage / IndexedDB**: データのローカル保存。
- **React Hook Form + Zod**: 入力フォームのバリデーションを強化。
- **React Calendar / FullCalendar**: カレンダービューの実装をサポート。

## データ構造
### 植物データ
```typescript
type WaterLog = {
  date: string; // ISO形式
  note?: string;
  imageUrl?: string;
};

type Plant = {
  id: string;
  name: string;
  species?: string;
  light?: 'sun' | 'shade' | 'partial';
  waterFrequencyDays: number;
  lastWatered: string;
  notes?: string;
  waterLogs: WaterLog[];
};
```

## 実装フェーズ
1. **MVP段階**: 植物の追加と水やり履歴の管理。
2. **植物ページ**: 詳細情報と水やり履歴の表示。
3. **カレンダービュー**: 水やり予定のカレンダー表示。
4. **アルバム機能**: 写真アップロードとコメント機能。
5. **データ永続化**: localStorageまたはIndexedDBの導入。
6. **状態管理**: Zustandを使用した状態管理の実装。
7. **デザイン整備**: Tailwind CSSを用いたデザインの改善。
8. **ドキュメント整備**: READMEと紹介ページの整備。

## インストール
1. リポジトリをクローンします。
2. 依存関係をインストールします。
   ```bash
   npm install
   ```
3. 開発サーバーを起動します。
   ```bash
   npm run dev
   ```

## ライセンス
このプロジェクトはMITライセンスの下で提供されています。