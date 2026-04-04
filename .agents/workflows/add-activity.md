---
description: 新しい活動報告（アクティビティ）を追加する
---

新しい活動を追加する場合、以下の手順を順番に実行してください。

1. **画像の配置**
   - ユーザーから提供された画像を `public/assets/images/activities/` に配置します。
   - メイン画像ファイル名は `yymmdd_EventName.jpg` 形式に、ギャラリー用は `yymmdd_EventName_N.jpg` 形式にすることを推奨します。

2. **Markdownファイルの作成**
   - `src/content/activities/[yymmdd_EventName].md` を新規作成します。
   - 以下のテンプレートを使用してフロントマターを記述します：

```markdown
---
title: "活動タイトル"
date: "yyyy.mm.dd"
rawDate: "yyyy-mm-dd"
image: "メイン画像名.jpg"
description: "一覧に表示する説明文"
featured: true
gallery:
  - "画像1.jpg"
  - "画像2.jpg"
---

活動内容はここに書く（HTMLタグ有効）
```

3. **整合性の確認**
   - `npm run dev` を実行し、ブラウザでトップページおよび活動一覧ページに新しいカードが表示されているか確認します。
   - カードをクリックして、個別ページの内容とフォトギャラリーが正しく表示されるか確認します。

4. **ビルドとデプロイ**
   - `npm run build` を実行してエラーがないか確認します。
   - 変更を GitHub へプッシュすると、GitHub Actions により自動的にデプロイされます。
   - **sitemap.xml はビルド時に自動生成されるため、手動更新は不要です。**