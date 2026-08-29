# Three/R3Fによる構造表現とCatppuccin一元化

Three.js/fiber/dreiは背景装飾ではなくエッジ/深度/発光の構造表現に用い、失敗時はCSSフォールバックする。Catppuccin Mochaパレットは `src/dashboard/client/src/lib/catppuccin.ts` でDOM/Three一元化し、情報に紐付けて配色する（base/mantle/crust/surface/mauve/lavender/overlay/green/red）。代替の背景装飾や分散定義より情報構造と一貫性が保てるため。
