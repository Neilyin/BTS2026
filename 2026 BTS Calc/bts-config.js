/**
 * 2026 Apple BTS 優惠計算機 — 資料設定檔 v2.0
 *
 * 選購流程（無ABC款，直接依 Apple 教育商店流程逐步選規格）：
 *
 * MacBook Air：尺寸 → 顏色 → 晶片(GPU核心) → 記憶體 → 儲存 → 電源轉接器 → BTS配件 → 回饋試算
 * MacBook Pro：尺寸 → 顯示器 → 晶片 → 記憶體 → 儲存 → 電源(自動) → BTS配件 → 回饋試算
 * iPad Air：  尺寸 → 顏色 → 儲存 → 連線 → 奈米紋理(無) → BTS配件 → 回饋試算
 * iPad Pro：  尺寸 → 顏色 → 儲存/晶片 → 連線 → 奈米紋理 → BTS配件 → 回饋試算
 *
 * 後台管理介面 (admin.html) 可直接修改所有 price 欄位。
 * 版本：2.0.0 | 最後更新：2026-05
 */

const BTS_CONFIG = {

  // ═══════════════════════════════════════════════
  //  活動總設定
  // ═══════════════════════════════════════════════
  meta: {
    year: 2026,
    campaignName: 'Apple BTS 教育優惠',
    // 信用卡回饋選項（百分比）
    creditCardRebateOptions: [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
    // 導購回饋選項（百分比）
    referralRebateOptions: [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
    purchaseLinks: {
      line:      'https://lin.ee/example',
      btsAgent:  'https://script.google.com/macros/s/AKfycbz1wAnl3eSL5XPMHR7phlSp0-4BbFdb0znWZ-0N5dyycfwoKLXHqohRK-b_5h4UoO5X/exec',
      official:  'https://www.apple.com/tw-edu/shop',
      dcard:     'https://www.dcard.tw/@neilyinnnnnnn',
      youtube:   'https://youtube.com/@neil.tw',
      instagram: 'https://www.instagram.com/neil.tw_/',
      website:   'https://neil.tw'
    }
  },

  // ═══════════════════════════════════════════════
  //  BTS 贈品設定（沿用去年折扣）
  // ═══════════════════════════════════════════════
  btsGifts: {

    // ── iPad：Apple Pencil 套組（生產力套組）──
    ipadPencil: [
      { id: 'pencil_pro',  name: 'Apple Pencil Pro',     btsPrice: 0,    originalPrice: 4000, tag: '生產力套組 (免費)' },
      { id: 'pencil_usbc', name: 'Apple Pencil (USB-C)', btsPrice: 2340, originalPrice: 2340, tag: '另購 NT$2,340' },
      { id: 'none',        name: '不加購 Apple Pencil',   btsPrice: 0,    originalPrice: 0,    tag: '不加購' }
    ],

    // ── iPad Air：鍵盤套組（依尺寸）──
    ipadAirKeyboard: {
      '11': [
        { id: 'keyboard', name: '適用 iPad Air 11吋巧控鍵盤', btsPrice: 4800, originalPrice: 8800, tag: '生產力套組 實付 NT$4,800（省 NT$4,000）' },
        { id: 'none',     name: '不加購鍵盤',                  btsPrice: 0,    originalPrice: 0,    tag: '不加購' }
      ],
      '13': [
        { id: 'keyboard', name: '適用 iPad Air 13吋巧控鍵盤', btsPrice: 5300, originalPrice: 9300, tag: '生產力套組 實付 NT$5,300（省 NT$4,000）' },
        { id: 'none',     name: '不加購鍵盤',                  btsPrice: 0,    originalPrice: 0,    tag: '不加購' }
      ]
    },

    // ── iPad Pro：鍵盤套組（依尺寸）──
    ipadProKeyboard: {
      '11': [
        { id: 'keyboard', name: '適用 iPad Pro 11吋巧控鍵盤', btsPrice: 5200, originalPrice: 9200,  tag: '生產力套組 實付 NT$5,200（省 NT$4,000）' },
        { id: 'none',     name: '不加購鍵盤',                  btsPrice: 0,    originalPrice: 0,     tag: '不加購' }
      ],
      '13': [
        { id: 'keyboard', name: '適用 iPad Pro 13吋巧控鍵盤', btsPrice: 7000, originalPrice: 11000, tag: '生產力套組 實付 NT$7,000（省 NT$4,000）' },
        { id: 'none',     name: '不加購鍵盤',                  btsPrice: 0,    originalPrice: 0,     tag: '不加購' }
      ]
    },

    // ── iPad：AirPods 套組──
    ipadAirpods: [
      { id: 'airpods4',     name: 'AirPods 4 一般版',      btsPrice: 0,    originalPrice: 4490, tag: 'AirPods套組 (免費)' },
      { id: 'airpods4_anc', name: 'AirPods 4 主動降噪版', btsPrice: 1500, originalPrice: 5990, tag: 'AirPods套組 實付 NT$1,500（省 NT$4,490）' },
      { id: 'airpods_pro2', name: 'AirPods Pro 2',         btsPrice: 3000, originalPrice: 7490, tag: 'AirPods套組 實付 NT$3,000（省 NT$4,490）' },
      { id: 'none',         name: '不加購 AirPods',         btsPrice: 0,    originalPrice: 0,    tag: '不加購' }
    ],

    // ── MacBook：生產力套組（三擇一，免費）──
    macbookProductivity: [
      { id: 'magic_mouse',    name: '巧控滑鼠',              btsPrice: 0, originalPrice: 2290, tag: '生產力套組 (免費)' },
      { id: 'magic_trackpad', name: '巧控板',                btsPrice: 0, originalPrice: 4990, tag: '生產力套組 (免費)' },
      { id: 'magic_keyboard', name: '巧控鍵盤（含Touch ID）', btsPrice: 0, originalPrice: 5990, tag: '生產力套組 (免費)' }
    ],

    // ── MacBook：AirPods 套組──
    macbookAirpods: [
      { id: 'airpods4_anc', name: 'AirPods 4 主動降噪版', btsPrice: 0,    originalPrice: 5990, tag: '娛樂套組 (免費)' },
      { id: 'airpods_pro2', name: 'AirPods Pro 2',         btsPrice: 1500, originalPrice: 7490, tag: '娛樂套組 實付 NT$1,500（省 NT$5,990）' },
      { id: 'none',         name: '不加購 AirPods',          btsPrice: 0,   originalPrice: 0,    tag: '不加購' }
    ]
  },

  // ═══════════════════════════════════════════════
  //  產品資料
  // ═══════════════════════════════════════════════
  products: {

    // ─────────────────────────────────────────────
    //  iPad Air（M3，教育商店）
    //  選購流程：尺寸 → 顏色 → 儲存 → 連線能力 → BTS配件
    // ─────────────────────────────────────────────
    ipadAir: {
      name: 'iPad Air',
      chip: 'M3',
      hasNano: false,
      colors: ['太空灰色', '藍色', '紫色', '星光色'],
      // 圖片連結：依「尺寸 → 顏色」設定，後台可逐一修改
      colorImages: {
        '11': {
          '太空灰色': 'https://drive.google.com/thumbnail?id=1aY-VmqSUABu4b23zIYssb1vVyGctzP2J&sz=w400',
          '藍色':     'https://drive.google.com/thumbnail?id=1GCxqI-B2OPrqaIdCLU_fgfbErAAgJeVU&sz=w400',
          '紫色':     'https://drive.google.com/thumbnail?id=1_DP-4P0pvYAJTvGeVadPceBea9V9G4k6&sz=w400',
          '星光色':   'https://drive.google.com/thumbnail?id=1X_u3wF2hK8HWcTEjaZ0P6NilkeGdtcaf&sz=w400'
        },
        '13': {
          '太空灰色': 'https://drive.google.com/thumbnail?id=1aY-VmqSUABu4b23zIYssb1vVyGctzP2J&sz=w400',
          '藍色':     'https://drive.google.com/thumbnail?id=1GCxqI-B2OPrqaIdCLU_fgfbErAAgJeVU&sz=w400',
          '紫色':     'https://drive.google.com/thumbnail?id=1_DP-4P0pvYAJTvGeVadPceBea9V9G4k6&sz=w400',
          '星光色':   'https://drive.google.com/thumbnail?id=1X_u3wF2hK8HWcTEjaZ0P6NilkeGdtcaf&sz=w400'
        }
      },
      sizes: {
        '11': {
          label: '11 吋',
          cellularExtra: 5000,
          storage: [
            { id: '128gb', name: '128GB', price: 18200 },
            { id: '256gb', name: '256GB', price: 21700 },
            { id: '512gb', name: '512GB', price: 28700 },
            { id: '1tb',   name: '1TB',   price: 34000 }
          ]
        },
        '13': {
          label: '13 吋',
          cellularExtra: 5000,
          storage: [
            { id: '128gb', name: '128GB', price: 25200 },
            { id: '256gb', name: '256GB', price: 28700 },
            { id: '512gb', name: '512GB', price: 35700 },
            { id: '1tb',   name: '1TB',   price: 41000 }
          ]
        }
      }
    },

    // ─────────────────────────────────────────────
    //  iPad Pro（M5，教育商店）
    //  選購流程：尺寸 → 顏色 → 儲存（晶片自動對應）→ 連線能力 → 奈米紋理 → BTS配件
    // ─────────────────────────────────────────────
    ipadPro: {
      name: 'iPad Pro',
      chip: 'M5',
      hasNano: true,
      nanoPrice: 3500,             // 奈米紋理玻璃加購價
      nanoEligible: ['1tb', '2tb'], // 僅 1TB / 2TB 可選奈米紋理
      colors: ['太空黑色', '銀色'],
      // 圖片連結：依「尺寸 → 顏色」設定
      colorImages: {
        '11': {
          '太空黑色': 'https://drive.google.com/thumbnail?id=1lb9tZkhv-UnsCIMuLs4AA360dsjM19bP&sz=w400',
          '銀色':     'https://drive.google.com/thumbnail?id=1uj0Fq_yXUGqodCS1rMXsMQtUOHMn2XXF&sz=w400'
        },
        '13': {
          '太空黑色': 'https://drive.google.com/thumbnail?id=1lb9tZkhv-UnsCIMuLs4AA360dsjM19bP&sz=w400',
          '銀色':     'https://drive.google.com/thumbnail?id=1uj0Fq_yXUGqodCS1rMXsMQtUOHMn2XXF&sz=w400'
        }
      },
      sizes: {
        '11': {
          label: '11 吋',
          cellularExtra: 7000,
          // 每個儲存容量對應固定晶片配置（M5）
          storage: [
            { id: '256gb', name: '256GB', price: 29400, ram: '12GB', cpu: '9核CPU', gpu: '10核GPU' },
            { id: '512gb', name: '512GB', price: 36400, ram: '12GB', cpu: '9核CPU', gpu: '10核GPU' },
            { id: '1tb',   name: '1TB',   price: 50400, ram: '16GB', cpu: '10核CPU', gpu: '10核GPU' },
            { id: '2tb',   name: '2TB',   price: 64400, ram: '16GB', cpu: '10核CPU', gpu: '10核GPU' }
          ]
        },
        '13': {
          label: '13 吋',
          cellularExtra: 7000,
          storage: [
            { id: '256gb', name: '256GB', price: 40400, ram: '12GB', cpu: '9核CPU', gpu: '10核GPU' },
            { id: '512gb', name: '512GB', price: 47400, ram: '12GB', cpu: '9核CPU', gpu: '10核GPU' },
            { id: '1tb',   name: '1TB',   price: 61400, ram: '16GB', cpu: '10核CPU', gpu: '10核GPU' },
            { id: '2tb',   name: '2TB',   price: 75400, ram: '16GB', cpu: '10核CPU', gpu: '10核GPU' }
          ]
        }
      }
    },

    // ─────────────────────────────────────────────
    //  MacBook Air（M5，教育商店）
    //  選購流程：尺寸 → 顏色 → 晶片(GPU) → 記憶體 → 儲存 → 電源轉接器 → BTS配件
    // ─────────────────────────────────────────────
    macbookAir: {
      name: 'MacBook Air',
      chip: 'M5',
      hasNano: false,
      colors: ['天藍色', '星光色', '銀色', '午夜色'],
      // 圖片連結：依「尺寸 → 顏色」設定
      colorImages: {
        '13': {
          '天藍色': 'https://i.imgur.com/XpWQhnW.png',
          '星光色': 'https://i.imgur.com/XpWQhnW.png',
          '銀色':   'https://i.imgur.com/4779MfS.png',
          '午夜色': 'https://i.imgur.com/XpWQhnW.png'
        },
        '15': {
          '天藍色': 'https://i.imgur.com/XpWQhnW.png',
          '星光色': 'https://i.imgur.com/XpWQhnW.png',
          '銀色':   'https://i.imgur.com/4779MfS.png',
          '午夜色': 'https://i.imgur.com/XpWQhnW.png'
        }
      },
      sizes: {
        '13': {
          label: '13 吋',
          basePrice: 32590,     // M5 8GPU / 16GB / 512GB
          // 晶片（GPU核心選擇）
          // 注意：選 10GPU 必須同時有 24GB+ 記憶體 OR 1TB+ 儲存
          chips: [
            {
              id: 'M5_8gpu',
              name: 'M5',
              detail: '10核CPU / 8核GPU',
              priceAdj: 0,
              desc: '標準配置，適合日常文書與多工處理'
            },
            {
              id: 'M5_10gpu',
              name: 'M5',
              detail: '10核CPU / 10核GPU',
              priceAdj: 3000,
              desc: '提升圖形效能，適合創意工作',
              // ⚠️ 限制：需同時選 24GB+ 記憶體 或 1TB+ 儲存
              requires: { minRam: '24gb', orMinStorage: '1tb' }
            }
          ],
          // 記憶體（從 16GB 基礎加價）
          memory: [
            { id: '16gb', name: '16GB', priceAdj: 0,     isDefault: true },
            { id: '24gb', name: '24GB', priceAdj: 6000  },
            { id: '32gb', name: '32GB', priceAdj: 12000 }
          ],
          // 儲存（從 512GB 基礎加價）
          storage: [
            { id: '512gb', name: '512GB', priceAdj: 0,     isDefault: true },
            { id: '1tb',   name: '1TB',   priceAdj: 6000  },
            { id: '2tb',   name: '2TB',   priceAdj: 18000 },
            { id: '4tb',   name: '4TB',   priceAdj: 36000 }
          ],
          // 電源轉接器規則：
          // - 8GPU base → 只有 30W
          // - 10GPU 且 512GB+ → 可免費選 35W 或 70W
          power: [
            { id: '30w', name: '30W USB-C',            priceAdj: 0, desc: '標準配置（8GPU 入門款）',    availableFor: 'all' },
            { id: '35w', name: '35W 雙 USB-C（小型）', priceAdj: 0, desc: '免費升級（10GPU + 512GB+）', availableFor: 'upgraded' },
            { id: '70w', name: '70W USB-C（快充）',    priceAdj: 0, desc: '免費升級（10GPU + 512GB+）', availableFor: 'upgraded' }
          ]
        },
        '15': {
          label: '15 吋',
          basePrice: 39590,   // M5 8GPU / 16GB / 512GB
          chips: [
            { id: 'M5_8gpu',  name: 'M5', detail: '10核CPU / 8核GPU',  priceAdj: 0,    desc: '標準配置' },
            { id: 'M5_10gpu', name: 'M5', detail: '10核CPU / 10核GPU', priceAdj: 3000, desc: '提升圖形效能', requires: { minRam: '24gb', orMinStorage: '1tb' } }
          ],
          memory: [
            { id: '16gb', name: '16GB', priceAdj: 0,     isDefault: true },
            { id: '24gb', name: '24GB', priceAdj: 6000  },
            { id: '32gb', name: '32GB', priceAdj: 12000 }
          ],
          storage: [
            { id: '512gb', name: '512GB', priceAdj: 0,     isDefault: true },
            { id: '1tb',   name: '1TB',   priceAdj: 6000  },
            { id: '2tb',   name: '2TB',   priceAdj: 18000 },
            { id: '4tb',   name: '4TB',   priceAdj: 36000 }
          ],
          // 15 吋全系列皆可免費選 35W 或 70W
          power: [
            { id: '35w', name: '35W 雙 USB-C（小型）', priceAdj: 0, desc: '免費選項', isDefault: true },
            { id: '70w', name: '70W USB-C（快充）',    priceAdj: 0, desc: '免費選項' }
          ]
        }
      }
    },

    // ─────────────────────────────────────────────
    //  MacBook Pro（M5 系列，教育商店）
    //
    //  選購流程：尺寸 → 顯示器玻璃 → 晶片
    //            → 記憶體升級 → 儲存升級
    //            → 電源轉接器（晶片自動決定）→ BTS配件
    //
    //  每個晶片選項有自己的 basePrice（含預設 RAM + 儲存）
    //  RAM / 儲存 升級價皆為「在此晶片基礎上的加價」
    // ─────────────────────────────────────────────
    macbookPro: {
      name: 'MacBook Pro',
      hasNano: true,
      nanoPrice: 4500,   // 任何款式皆可加購奈米紋理顯示器
      // 顏色依晶片 tier 不同
      colors: {
        base: ['銀色', '太空灰色'],
        pro:  ['銀色', '太空黑色'],
        max:  ['銀色', '太空黑色']
      },
      // 圖片連結：依「尺寸 → 顏色」設定，後台可逐一修改
      colorImages: {
        '14': {
          '銀色':     'https://i.imgur.com/vofFina.png',
          '太空灰色': 'https://i.imgur.com/vofFina.png',
          '太空黑色': 'https://i.imgur.com/RmSGBKw.png'
        },
        '16': {
          '銀色':     'https://i.imgur.com/vofFina.png',
          '太空灰色': 'https://i.imgur.com/vofFina.png',
          '太空黑色': 'https://i.imgur.com/RmSGBKw.png'
        }
      },

      sizes: {

        '14': {
          label: '14 吋',
          chips: [

            // ── M5 (10核CPU / 10核GPU) ──
            {
              id: 'M5',
              name: 'M5',
              detail: '10核CPU / 10核GPU',
              tier: 'base',
              basePrice: 51690,       // 含 16GB RAM + 512GB SSD
              defaultRam: '16gb',
              defaultStorage: '512gb',
              defaultPower: '70w',
              desc: '入門款，適合大多數專業工作',
              memory: [
                { id: '16gb', name: '16GB', priceAdj: 0,     isDefault: true },
                { id: '24gb', name: '24GB', priceAdj: 6000  },
                { id: '32gb', name: '32GB', priceAdj: 12000 }
              ],
              storage: [
                { id: '512gb', name: '512GB', priceAdj: 0,     isDefault: true },
                { id: '1tb',   name: '1TB',   priceAdj: 6000  },
                { id: '2tb',   name: '2TB',   priceAdj: 18000 },
                { id: '4tb',   name: '4TB',   priceAdj: 54000 }
              ],
              power: [
                { id: '70w', name: '70W USB-C',              priceAdj: 0,   isDefault: true },
                { id: '96w', name: '96W USB-C（支援快充）',  priceAdj: 500 }
              ]
            },

            // ── M5 Pro (12核CPU / 16核GPU) ──
            {
              id: 'M5_Pro_12c',
              name: 'M5 Pro',
              detail: '12核CPU / 16核GPU',
              tier: 'pro',
              basePrice: 63690,       // 含 24GB RAM + 512GB SSD
              defaultRam: '24gb',
              defaultStorage: '512gb',
              defaultPower: '96w',
              desc: '專業效能，多核心大幅提升',
              memory: [
                { id: '24gb', name: '24GB', priceAdj: 0,     isDefault: true },
                { id: '48gb', name: '48GB', priceAdj: 12000 }
              ],
              storage: [
                { id: '512gb', name: '512GB', priceAdj: 0,     isDefault: true },
                { id: '1tb',   name: '1TB',   priceAdj: 6000  },
                { id: '2tb',   name: '2TB',   priceAdj: 18000 },
                { id: '4tb',   name: '4TB',   priceAdj: 54000 },
                { id: '8tb',   name: '8TB',   priceAdj: 126000 }
              ],
              power: [
                { id: '96w', name: '96W USB-C（標準配置）', priceAdj: 0, isDefault: true }
              ]
            },

            // ── M5 Pro (14核CPU / 20核GPU) ──
            {
              id: 'M5_Pro_14c',
              name: 'M5 Pro',
              detail: '14核CPU / 20核GPU',
              tier: 'pro',
              basePrice: 69690,       // 含 24GB RAM + 512GB SSD
              defaultRam: '24gb',
              defaultStorage: '512gb',
              defaultPower: '96w',
              desc: '旗艦 Pro，高效能影音剪輯首選',
              memory: [
                { id: '24gb', name: '24GB', priceAdj: 0,     isDefault: true },
                { id: '48gb', name: '48GB', priceAdj: 12000 }
              ],
              storage: [
                { id: '512gb', name: '512GB', priceAdj: 0,     isDefault: true },
                { id: '1tb',   name: '1TB',   priceAdj: 6000  },
                { id: '2tb',   name: '2TB',   priceAdj: 18000 },
                { id: '4tb',   name: '4TB',   priceAdj: 54000 },
                { id: '8tb',   name: '8TB',   priceAdj: 126000 }
              ],
              power: [
                { id: '96w', name: '96W USB-C（標準配置）', priceAdj: 0, isDefault: true }
              ]
            },

            // ── M5 Max (14核CPU / 32核GPU) ──
            {
              id: 'M5_Max_14c',
              name: 'M5 Max',
              detail: '14核CPU / 32核GPU',
              tier: 'max',
              basePrice: 93690,       // 含 36GB RAM + 1TB SSD
              defaultRam: '36gb',
              defaultStorage: '1tb',
              defaultPower: '96w',
              desc: '極致效能，專業影片 / 3D 製作',
              memory: [
                { id: '36gb',  name: '36GB',  priceAdj: 0,     isDefault: true },
                { id: '64gb',  name: '64GB',  priceAdj: 18000 },
                { id: '128gb', name: '128GB', priceAdj: 30000 }
              ],
              storage: [
                { id: '1tb',  name: '1TB',  priceAdj: 0,     isDefault: true },
                { id: '2tb',  name: '2TB',  priceAdj: 12000 },
                { id: '4tb',  name: '4TB',  priceAdj: 48000 },
                { id: '8tb',  name: '8TB',  priceAdj: 120000 }
              ],
              power: [
                { id: '96w', name: '96W USB-C（標準配置）', priceAdj: 0, isDefault: true }
              ]
            },

            // ── M5 Max (16核CPU / 40核GPU) ──
            {
              id: 'M5_Max_16c',
              name: 'M5 Max',
              detail: '16核CPU / 40核GPU',
              tier: 'max',
              basePrice: 102690,      // 含 48GB RAM + 1TB SSD
              defaultRam: '48gb',
              defaultStorage: '1tb',
              defaultPower: '96w',
              desc: '頂規旗艦，最高可達 128GB 記憶體',
              memory: [
                { id: '48gb',  name: '48GB',  priceAdj: 0,     isDefault: true },
                { id: '64gb',  name: '64GB',  priceAdj: 18000 },
                { id: '128gb', name: '128GB', priceAdj: 30000 }
              ],
              storage: [
                { id: '1tb',  name: '1TB',  priceAdj: 0,     isDefault: true },
                { id: '2tb',  name: '2TB',  priceAdj: 12000 },
                { id: '4tb',  name: '4TB',  priceAdj: 48000 },
                { id: '8tb',  name: '8TB',  priceAdj: 120000 }
              ],
              power: [
                { id: '96w', name: '96W USB-C（標準配置）', priceAdj: 0, isDefault: true }
              ]
            }

          ] // end chips 14"
        }, // end 14"

        '16': {
          label: '16 吋',
          chips: [

            // ── M5 Pro (14核CPU / 20核GPU) ──（16吋入門）
            {
              id: 'M5_Pro_14c',
              name: 'M5 Pro',
              detail: '14核CPU / 20核GPU',
              tier: 'pro',
              basePrice: 83190,       // 含 24GB RAM + 512GB SSD
              defaultRam: '24gb',
              defaultStorage: '512gb',
              defaultPower: '140w',
              desc: '16吋旗艦螢幕，Pro 主力款',
              memory: [
                { id: '24gb', name: '24GB', priceAdj: 0,     isDefault: true },
                { id: '48gb', name: '48GB', priceAdj: 14000 }
              ],
              storage: [
                { id: '512gb', name: '512GB', priceAdj: 0,     isDefault: true },
                { id: '1tb',   name: '1TB',   priceAdj: 6300  },
                { id: '2tb',   name: '2TB',   priceAdj: 18900 },
                { id: '4tb',   name: '4TB',   priceAdj: 56700 },
                { id: '8tb',   name: '8TB',   priceAdj: 131700 }
              ],
              power: [
                { id: '140w', name: '140W USB-C（標準配置）', priceAdj: 0, isDefault: true }
              ]
            },

            // ── M5 Max (14核CPU / 32核GPU) ──
            {
              id: 'M5_Max_14c',
              name: 'M5 Max',
              detail: '14核CPU / 32核GPU',
              tier: 'max',
              basePrice: 102090,      // 16吋 M5 Pro base + 18,900 升級
              defaultRam: '36gb',
              defaultStorage: '1tb',
              defaultPower: '140w',
              desc: '16吋最強 Max，極致多核效能',
              memory: [
                { id: '36gb',  name: '36GB',  priceAdj: 0,     isDefault: true },
                { id: '64gb',  name: '64GB',  priceAdj: 18000 },
                { id: '128gb', name: '128GB', priceAdj: 30000 }
              ],
              storage: [
                { id: '1tb',  name: '1TB',  priceAdj: 0,     isDefault: true },
                { id: '2tb',  name: '2TB',  priceAdj: 12600 },
                { id: '4tb',  name: '4TB',  priceAdj: 50400 },
                { id: '8tb',  name: '8TB',  priceAdj: 125400 }
              ],
              power: [
                { id: '140w', name: '140W USB-C（標準配置）', priceAdj: 0, isDefault: true }
              ]
            },

            // ── M5 Max (16核CPU / 40核GPU) ──
            {
              id: 'M5_Max_16c',
              name: 'M5 Max',
              detail: '16核CPU / 40核GPU',
              tier: 'max',
              basePrice: 109390,      // 16吋 M5 Pro base + 26,200 升級
              defaultRam: '48gb',
              defaultStorage: '1tb',
              defaultPower: '140w',
              desc: '16吋頂規旗艦，最高 128GB 記憶體',
              memory: [
                { id: '48gb',  name: '48GB',  priceAdj: 0,     isDefault: true },
                { id: '64gb',  name: '64GB',  priceAdj: 20300 },
                { id: '128gb', name: '128GB', priceAdj: 45500 }
              ],
              storage: [
                { id: '1tb',  name: '1TB',  priceAdj: 0,     isDefault: true },
                { id: '2tb',  name: '2TB',  priceAdj: 12600 },
                { id: '4tb',  name: '4TB',  priceAdj: 50400 },
                { id: '8tb',  name: '8TB',  priceAdj: 125400 }
              ],
              power: [
                { id: '140w', name: '140W USB-C（標準配置）', priceAdj: 0, isDefault: true }
              ]
            }

          ] // end chips 16"
        } // end 16"
      }
    } // end macbookPro
  }
};

// 瀏覽器環境：掛到 window；Node 環境：匯出
if (typeof window !== 'undefined') {
  window.BTS_CONFIG = BTS_CONFIG;
} else if (typeof module !== 'undefined') {
  module.exports = BTS_CONFIG;
}
