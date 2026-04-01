---
description: 新しい活動報告（アクティビティ）を追加する
---

新しい活動を追加する場合、以下の手順を順番に実行してください。

1. **画像の配置**
   - ユーザーから提供された画像を `assets/images/activities/` に配置します。
   - ファイル名は `yymmdd_EventName_N.jpg` 形式にします。
   - `assets/images/activities/にある画像を参考にしてください。

2. **JSONデータの更新**
   - `assets/data/activities.json` を読み込みます。
   - 新しい活動オブジェクトを配列の先頭に追加します。
   - `link` はこれから作成するHTMLファイル名、`image` はメイン画像名にします。
   - 複数の画像がある場合は `gallery` 配列に全て記述します。

3. **HTMLページの作成**
   - `activities/report_template.html` を読み込みます。
   - `activities/[filename].html` として新しく保存します。
   - 以下の箇所を置換・編集します：
     - `<title>` タグ（活動名を含める）
     - オープングラフ（OGP）のタイトル
     - ヒーローセクションの `h1`（活動名）と `p`（日付）
     - コンテンツカード内のメイン画像 `img src` と `alt`
     - 本文テキスト

4. **整合性の確認**
   - `index.html` または `activities/index.html` をブラウザで開き、新しい活動がカードとして表示されているか確認します。
   - カードをクリックして、作成した詳細ページが正しく表示され、ギャラリーがロードされるか確認します。

5. **`sitemap.xml`の更新**