/**
 * 2026 Apple BTS 優惠計算機 — 資料設定檔 v2.0
 *
 * 選購流程（無ABC款，直接依 Apple 教育商店流程逐步選規格）：
 *
 * MacBook Air：尺寸 → 顏色 → 晶片(GPU核心) → 記憶體 → 儲存 → 電源轉接器 → BTS配件 → 回饋試算
 * MacBook Pro：尺寸 → 顏色 → 顯示器 → 晶片 → 處理能力 → 記憶體 → 儲存 → 電源轉接器 → BTS配件 → 回饋試算
 * iMac：顏色 → 晶片 → 記憶體 → 儲存 → 底座 → 乙太網路 → 滑鼠/觸控板 → 鍵盤 → BTS配件 → 回饋試算
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

  // 彈性優惠組合：後台可新增。若某產品有符合的組合，前台會優先使用這裡。
  btsGiftCombos: [],

  // ═══════════════════════════════════════════════
  //  產品資料
  // ═══════════════════════════════════════════════
  products: {

    // ─────────────────────────────────────────────
    //  iPad Air（M4，教育商店）
    //  選購流程：尺寸 → 顏色 → 儲存 → 連線能力 → BTS配件
    // ─────────────────────────────────────────────
    ipadAir: {
      name: 'iPad Air',
      chip: 'M4',
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
    //  選購流程：尺寸 → 顏色 → 儲存（晶片自動對應）→ 顯示器玻璃 → 連線能力 → BTS配件
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
    //  MacBook Neo（教育商店）
    //  官方選購流程：顏色 → 儲存 → 回饋試算
    // ─────────────────────────────────────────────
    macbookNeo: {
      name: 'MacBook Neo',
      chip: 'A18 Pro',
      sizeLabel: '13 吋',
      basePrice: 16900,
      colors: ['胭粉色', '青橘黃色', '靛青色', '銀色'],
      colorImages: {
        '13': {
          '胭粉色': '',
          '青橘黃色': '',
          '靛青色': '',
          '銀色': ''
        }
      },
      fixedMemory: { id: '8gb', name: '8GB', priceAdj: 0 },
      storage: [
        { id: '256gb', name: '256GB', priceAdj: 0, isDefault: true },
        { id: '512gb', name: '512GB', priceAdj: 3000 }
      ]
    },

    // ─────────────────────────────────────────────
    //  MacBook Air（M5，教育商店）
    //  官方選購流程：尺寸 → 顏色 → M5 晶片處理能力 → 自訂配置（記憶體 / 儲存 / 電源）
    // ─────────────────────────────────────────────
    macbookAir: {
      name: 'MacBook Air',
      chip: 'M5',
      hasNano: false,
      chipImage: 'https://www.apple.com/newsroom/images/2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon/tile/Apple-M5-hero-251015-lp.jpg.landing-big_2x.jpg',
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
          chips: [
            {
              id: 'M5_8gpu',
              name: 'M5',
              detail: '10 核心 CPU / 8 核心 GPU / 16 核心神經網路引擎',
              priceAdj: 0,
              basePrice: 32590,
              desc: '讓你的一切操控速度更快，有如行雲流水般流暢。'
            },
            {
              id: 'M5_10gpu',
              name: 'M5',
              detail: '10 核心 CPU / 10 核心 GPU / 16 核心神經網路引擎',
              priceAdj: 3150,
              basePrice: 35740,
              desc: '透過提升處理與繪圖速度，為遊戲和創意工作帶來重大效能。',
              isDefault: false
            }
          ],
          // 記憶體（從 16GB 基礎加價）
          memory: [
            { id: '16gb', name: '16GB', priceAdj: 0,     isDefault: true },
            { id: '24gb', name: '24GB', priceAdj: 7000,  availableChips: ['M5_10gpu'], unavailableText: '查看價格與更改項目' },
            { id: '32gb', name: '32GB', priceAdj: 13300, availableChips: ['M5_10gpu'], unavailableText: '查看價格與更改項目' }
          ],
          // 儲存（從 512GB 基礎加價）
          storage: [
            { id: '512gb', name: '512GB', priceAdj: 0,     isDefault: true },
            { id: '1tb',   name: '1TB',   priceAdj: 7000,  availableChips: ['M5_10gpu'], unavailableText: '查看價格與更改項目' },
            { id: '2tb',   name: '2TB',   priceAdj: 19600, availableChips: ['M5_10gpu'], unavailableText: '查看價格與更改項目' },
            { id: '4tb',   name: '4TB',   priceAdj: 38500, availableChips: ['M5_10gpu'], unavailableText: '查看價格與更改項目' }
          ],
          // 電源轉接器規則：官網目前提供 40W / 35W / 70W
          power: [
            { id: '40w', name: '40W 動態電源（最高輸出 60W）', priceAdj: 0, desc: '標準配置', isDefault: true, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-40w_GEO_TW?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHUldobHozdU9MQnV6TkIvMFlYWm5ZVHYzNmJ5OEoyYVhwazd1djRTdHpEeW5WOGRHQ3ZYRTFSbWtOcmtMWGxEbjJHUERIaThjNlYyT2ZWT2pCSitiRndxSkRZYnU4S2l4QVhRZStkR2szaWo&traceId=1' },
            { id: '35w', name: '35W 雙 USB-C 埠',             priceAdj: 500, desc: '尺寸精巧，配備兩個連接埠，可同時為兩部裝置充電。', image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-35w?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHVWNjejlKaFlXSWZzdEJBTWUvTnJNeVJieFVCazhaRis0ZGlmMkluWW4vaUZXZzlzM2cwVmJseGdsS3RYT09za2phUklkcnpZVGhYdDkrTUllUGFrRXArYWpGdS9XeFgvbS9ITnNYOEhYaG4&traceId=1' },
            { id: '70w', name: '70W USB-C',                   priceAdj: 500, desc: '支援快速充電，約 30 分鐘最高可達 50% 電量。', image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-70w_AV1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHWUZIbTRqYnhHNWczVVhiR2V0eHVjOWxjSS9LSnJ6VHlvRXVuRWZVYmhrV3paYzZqNzJ2c05GREJ4YktTc3FTVDNaZStqMGcrcmlDQ1F3cUVTa2hnNkpQbktOZGJrM1FNVmxpdTBwQ0E4bDU&traceId=1' }
          ]
        },
        '15': {
          label: '15 吋',
          basePrice: 39590,   // M5 10GPU / 16GB / 512GB
          chips: [
            { id: 'M5_10gpu', name: 'M5', detail: '10核CPU / 10核GPU', priceAdj: 0, desc: '15 吋全系列標準配置' }
          ],
          memory: [
            { id: '16gb', name: '16GB', priceAdj: 0,     isDefault: true },
            { id: '24gb', name: '24GB', priceAdj: 7000  },
            { id: '32gb', name: '32GB', priceAdj: 13300 }
          ],
          storage: [
            { id: '512gb', name: '512GB', priceAdj: 0,     isDefault: true },
            { id: '1tb',   name: '1TB',   priceAdj: 7000  },
            { id: '2tb',   name: '2TB',   priceAdj: 19600 },
            { id: '4tb',   name: '4TB',   priceAdj: 38500 }
          ],
          // 電源轉接器：官方目前提供 40W / 35W / 70W
          power: [
            { id: '40w', name: '40W 動態電源（最高輸出 60W）', priceAdj: 0, desc: '標準配置', isDefault: true, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-40w_GEO_TW?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHUldobHozdU9MQnV6TkIvMFlYWm5ZVHYzNmJ5OEoyYVhwazd1djRTdHpEeW5WOGRHQ3ZYRTFSbWtOcmtMWGxEbjJHUERIaThjNlYyT2ZWT2pCSitiRndxSkRZYnU4S2l4QVhRZStkR2szaWo&traceId=1' },
            { id: '35w', name: '35W 雙 USB-C',                priceAdj: 500, desc: '可同時為兩部裝置充電', image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-35w?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHVWNjejlKaFlXSWZzdEJBTWUvTnJNeVJieFVCazhaRis0ZGlmMkluWW4vaUZXZzlzM2cwVmJseGdsS3RYT09za2phUklkcnpZVGhYdDkrTUllUGFrRXArYWpGdS9XeFgvbS9ITnNYOEhYaG4&traceId=1' },
            { id: '70w', name: '70W USB-C（快充）',           priceAdj: 500, desc: '支援快速充電', image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-70w_AV1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHWUZIbTRqYnhHNWczVVhiR2V0eHVjOWxjSS9LSnJ6VHlvRXVuRWZVYmhrV3paYzZqNzJ2c05GREJ4YktTc3FTVDNaZStqMGcrcmlDQ1F3cUVTa2hnNkpQbktOZGJrM1FNVmxpdTBwQ0E4bDU&traceId=1' }
          ]
        }
      }
    },

    // ─────────────────────────────────────────────
    //  MacBook Pro（M5 系列，教育商店）
    //
    //  官方選購流程：尺寸 → 顏色 → 顯示器 → 晶片
    //            → 處理能力 → 自訂配置（記憶體 / SSD / 電源）
    //
    //  每個晶片選項有自己的 basePrice（含預設 RAM + 儲存）
    //  RAM / 儲存 升級價皆為「在此晶片基礎上的加價」
    // ─────────────────────────────────────────────
    macbookPro: {
      name: 'MacBook Pro',
      hasNano: true,
      nanoPrice: 4725,   // 任何款式皆可加購奈米紋理顯示器
      // 官網目前所有 MacBook Pro 尺寸皆提供太空黑色 / 銀色
      colors: ['太空黑色', '銀色'],
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
              processor: 'm5',
              name: 'M5',
              detail: '10核CPU / 10核GPU',
              tier: 'base',
              basePrice: 51690,       // 含 16GB RAM + 1TB SSD
              defaultRam: '16gb',
              defaultStorage: '1tb',
              defaultPower: '70w',
              desc: '入門款，適合大多數專業工作',
              memory: [
                { id: '16gb', name: '16GB', priceAdj: 0,     isDefault: true },
                { id: '24gb', name: '24GB', priceAdj: 7000  },
                { id: '32gb', name: '32GB', priceAdj: 14000 }
              ],
              storage: [
                { id: '1tb',   name: '1TB',   priceAdj: 0,     isDefault: true },
                { id: '2tb',   name: '2TB',   priceAdj: 12600 },
                { id: '4tb',   name: '4TB',   priceAdj: 50400 }
              ],
              power: [
                { id: '70w',  name: '70W USB-C',  priceAdj: 0, isDefault: true, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-70w_AV1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHWUZIbTRqYnhHNWczVVhiR2V0eHVjOWxjSS9LSnJ6VHlvRXVuRWZVYmhrV3paYzZqNzJ2c05GREJ4YktTc3FTVDNaZStqMGcrcmlDQ1F3cUVTa2hnNkpQbktOZGJrM1FNVmxpdTBwQ0E4bDU&traceId=1' },
                { id: '140w', name: '140W USB-C', priceAdj: 500, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-140w_AV1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHWTlEaDAwVjZaZTRyK1h3ZW5QZW9vdzJpaVhHakl1NktraHQ0cW9hbVJNUk5qdmVQUCtUeFBLKzRmNXZ0dlI4eUMyRnNXMEdqNUJBNEI1TGZVTTB5c2lCcDFhUlRneGJxMGNjRmsvTE96S3E&traceId=1' }
              ]
            },

            // ── M5 Pro (15核CPU / 16核GPU) ──
            {
              id: 'M5_Pro_15_16',
              processor: 'm5pro',
              name: 'M5 Pro',
              detail: '15核CPU / 16核GPU',
              tier: 'pro',
              basePrice: 69790,       // 含 24GB RAM + 1TB SSD
              defaultRam: '24gb',
              defaultStorage: '1tb',
              defaultPower: '70w',
              desc: '專業效能，多核心大幅提升',
              memory: [
                { id: '24gb', name: '24GB', priceAdj: 0,     isDefault: true },
                { id: '48gb', name: '48GB', priceAdj: 12600 },
                { id: '64gb', name: '64GB', priceAdj: 18900, upgradeToChip: 'M5_Pro_18_20', unavailableText: '查看價格與更改項目' }
              ],
              storage: [
                { id: '1tb',   name: '1TB',   priceAdj: 0,     isDefault: true },
                { id: '2tb',   name: '2TB',   priceAdj: 12600 },
                { id: '4tb',   name: '4TB',   priceAdj: 31500 }
              ],
              power: [
                { id: '70w',  name: '70W USB-C',  priceAdj: 0, isDefault: true, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-70w_AV1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHWUZIbTRqYnhHNWczVVhiR2V0eHVjOWxjSS9LSnJ6VHlvRXVuRWZVYmhrV3paYzZqNzJ2c05GREJ4YktTc3FTVDNaZStqMGcrcmlDQ1F3cUVTa2hnNkpQbktOZGJrM1FNVmxpdTBwQ0E4bDU&traceId=1' },
                { id: '140w', name: '140W USB-C', priceAdj: 500, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-140w_AV1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHWTlEaDAwVjZaZTRyK1h3ZW5QZW9vdzJpaVhHakl1NktraHQ0cW9hbVJNUk5qdmVQUCtUeFBLKzRmNXZ0dlI4eUMyRnNXMEdqNUJBNEI1TGZVTTB5c2lCcDFhUlRneGJxMGNjRmsvTE96S3E&traceId=1' }
              ]
            },

            // ── M5 Pro (18核CPU / 20核GPU) ──
            {
              id: 'M5_Pro_18_20',
              processor: 'm5pro',
              name: 'M5 Pro',
              detail: '18核CPU / 20核GPU',
              tier: 'pro',
              basePrice: 76390,       // 含 24GB RAM + 1TB SSD
              defaultRam: '24gb',
              defaultStorage: '1tb',
              defaultPower: '140w',
              requiresPowerSelection: false,
              desc: '旗艦 Pro，高效能影音剪輯首選',
              memory: [
                { id: '24gb', name: '24GB', priceAdj: 0,     isDefault: true },
                { id: '48gb', name: '48GB', priceAdj: 12600 },
                { id: '64gb', name: '64GB', priceAdj: 18900 }
              ],
              storage: [
                { id: '1tb',   name: '1TB',   priceAdj: 0,     isDefault: true },
                { id: '2tb',   name: '2TB',   priceAdj: 12600 },
                { id: '4tb',   name: '4TB',   priceAdj: 31500 }
              ],
              power: [
                { id: '140w', name: '140W USB-C', priceAdj: 0, isDefault: true, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-140w_AV1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHWTlEaDAwVjZaZTRyK1h3ZW5QZW9vdzJpaVhHakl1NktraHQ0cW9hbVJNUk5qdmVQUCtUeFBLKzRmNXZ0dlI4eUMyRnNXMEdqNUJBNEI1TGZVTTB5c2lCcDFhUlRneGJxMGNjRmsvTE96S3E&traceId=1' }
              ]
            },

            // ── M5 Max (18核CPU / 32核GPU) ──
            {
              id: 'M5_Max_18_32',
              processor: 'm5max',
              name: 'M5 Max',
              detail: '18核CPU / 32核GPU',
              tier: 'max',
              basePrice: 109890,      // 含 36GB RAM + 2TB SSD
              defaultRam: '36gb',
              defaultStorage: '2tb',
              defaultPower: '140w',
              requiresPowerSelection: false,
              desc: '極致效能，專業影片 / 3D 製作',
              memory: [
                { id: '36gb',  name: '36GB',  priceAdj: 0,     isDefault: true },
                { id: '48gb',  name: '48GB',  priceAdj: 0,     upgradeToChip: 'M5_Max_18_40', unavailableText: '查看價格與更改項目' },
                { id: '64gb',  name: '64GB',  priceAdj: 12600, upgradeToChip: 'M5_Max_18_40', unavailableText: '查看價格與更改項目' },
                { id: '128gb', name: '128GB', priceAdj: 63000, upgradeToChip: 'M5_Max_18_40', unavailableText: '查看價格與更改項目' }
              ],
              storage: [
                { id: '2tb',  name: '2TB',  priceAdj: 0,     isDefault: true },
                { id: '4tb',  name: '4TB',  priceAdj: 18900 },
                { id: '8tb',  name: '8TB',  priceAdj: 56700 }
              ],
              power: [
                { id: '140w', name: '140W USB-C', priceAdj: 0, isDefault: true, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-140w_AV1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHWTlEaDAwVjZaZTRyK1h3ZW5QZW9vdzJpaVhHakl1NktraHQ0cW9hbVJNUk5qdmVQUCtUeFBLKzRmNXZ0dlI4eUMyRnNXMEdqNUJBNEI1TGZVTTB5c2lCcDFhUlRneGJxMGNjRmsvTE96S3E&traceId=1' }
              ]
            },

            // ── M5 Max (18核CPU / 40核GPU) ──
            {
              id: 'M5_Max_18_40',
              processor: 'm5max',
              name: 'M5 Max',
              detail: '18核CPU / 40核GPU',
              tier: 'max',
              basePrice: 125640,      // 含 48GB RAM + 2TB SSD
              defaultRam: '48gb',
              defaultStorage: '2tb',
              defaultPower: '140w',
              requiresPowerSelection: false,
              desc: '頂規旗艦，最高可達 128GB 記憶體',
              memory: [
                { id: '48gb',  name: '48GB',  priceAdj: 0,     isDefault: true },
                { id: '64gb',  name: '64GB',  priceAdj: 6300 },
                { id: '128gb', name: '128GB', priceAdj: 31500 }
              ],
              storage: [
                { id: '2tb',  name: '2TB',  priceAdj: 0,     isDefault: true },
                { id: '4tb',  name: '4TB',  priceAdj: 18900 },
                { id: '8tb',  name: '8TB',  priceAdj: 56700 }
              ],
              power: [
                { id: '140w', name: '140W USB-C', priceAdj: 0, isDefault: true, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-140w_AV1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHWTlEaDAwVjZaZTRyK1h3ZW5QZW9vdzJpaVhHakl1NktraHQ0cW9hbVJNUk5qdmVQUCtUeFBLKzRmNXZ0dlI4eUMyRnNXMEdqNUJBNEI1TGZVTTB5c2lCcDFhUlRneGJxMGNjRmsvTE96S3E&traceId=1' }
              ]
            }

          ] // end chips 14"
        }, // end 14"

        '16': {
          label: '16 吋',
          chips: [

            // ── M5 Pro (18核CPU / 20核GPU) ──（16吋入門）
            {
              id: 'M5_Pro_18_20',
              processor: 'm5pro',
              name: 'M5 Pro',
              detail: '18核CPU / 20核GPU',
              tier: 'pro',
              basePrice: 83190,       // 含 24GB RAM + 1TB SSD
              defaultRam: '24gb',
              defaultStorage: '1tb',
              defaultPower: '140w',
              requiresPowerSelection: false,
              desc: '16吋旗艦螢幕，Pro 主力款',
              memory: [
                { id: '24gb', name: '24GB', priceAdj: 0,     isDefault: true },
                { id: '48gb', name: '48GB', priceAdj: 14000 },
                { id: '64gb', name: '64GB', priceAdj: 20300 }
              ],
              storage: [
                { id: '1tb',   name: '1TB',   priceAdj: 0,     isDefault: true },
                { id: '2tb',   name: '2TB',   priceAdj: 12600 },
                { id: '4tb',   name: '4TB',   priceAdj: 31500 }
              ],
              power: [
                { id: '140w', name: '140W USB-C', priceAdj: 0, isDefault: true, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-140w_AV1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHWTlEaDAwVjZaZTRyK1h3ZW5QZW9vdzJpaVhHakl1NktraHQ0cW9hbVJNUk5qdmVQUCtUeFBLKzRmNXZ0dlI4eUMyRnNXMEdqNUJBNEI1TGZVTTB5c2lCcDFhUlRneGJxMGNjRmsvTE96S3E&traceId=1' }
              ]
            },

            // ── M5 Max (18核CPU / 32核GPU) ──
            {
              id: 'M5_Max_18_32',
              processor: 'm5max',
              name: 'M5 Max',
              detail: '18核CPU / 32核GPU',
              tier: 'max',
              basePrice: 119890,      // 含 36GB RAM + 2TB SSD
              defaultRam: '36gb',
              defaultStorage: '2tb',
              defaultPower: '140w',
              requiresPowerSelection: false,
              desc: '16吋最強 Max，極致多核效能',
              memory: [
                { id: '36gb',  name: '36GB',  priceAdj: 0,     isDefault: true },
                { id: '48gb',  name: '48GB',  priceAdj: 0,     upgradeToChip: 'M5_Max_18_40', unavailableText: '查看價格與更改項目' },
                { id: '64gb',  name: '64GB',  priceAdj: 6300,  upgradeToChip: 'M5_Max_18_40', unavailableText: '查看價格與更改項目' },
                { id: '128gb', name: '128GB', priceAdj: 31500, upgradeToChip: 'M5_Max_18_40', unavailableText: '查看價格與更改項目' }
              ],
              storage: [
                { id: '2tb',  name: '2TB',  priceAdj: 0,     isDefault: true },
                { id: '4tb',  name: '4TB',  priceAdj: 18900 },
                { id: '8tb',  name: '8TB',  priceAdj: 56700 }
              ],
              power: [
                { id: '140w', name: '140W USB-C', priceAdj: 0, isDefault: true, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-140w_AV1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHWTlEaDAwVjZaZTRyK1h3ZW5QZW9vdzJpaVhHakl1NktraHQ0cW9hbVJNUk5qdmVQUCtUeFBLKzRmNXZ0dlI4eUMyRnNXMEdqNUJBNEI1TGZVTTB5c2lCcDFhUlRneGJxMGNjRmsvTE96S3E&traceId=1' }
              ]
            },

            // ── M5 Max (18核CPU / 40核GPU) ──
            {
              id: 'M5_Max_18_40',
              processor: 'm5max',
              name: 'M5 Max',
              detail: '18核CPU / 40核GPU',
              tier: 'max',
              basePrice: 137890,      // 含 48GB RAM + 2TB SSD
              defaultRam: '48gb',
              defaultStorage: '2tb',
              defaultPower: '140w',
              requiresPowerSelection: false,
              desc: '16吋頂規旗艦，最高 128GB 記憶體',
              memory: [
                { id: '48gb',  name: '48GB',  priceAdj: 0,     isDefault: true },
                { id: '64gb',  name: '64GB',  priceAdj: 6300 },
                { id: '128gb', name: '128GB', priceAdj: 31500 }
              ],
              storage: [
                { id: '2tb',  name: '2TB',  priceAdj: 0,     isDefault: true },
                { id: '4tb',  name: '4TB',  priceAdj: 18900 },
                { id: '8tb',  name: '8TB',  priceAdj: 56700 }
              ],
              power: [
                { id: '140w', name: '140W USB-C', priceAdj: 0, isDefault: true, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-adapter-select-202601-140w_AV1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=bDZYbEhmUk4wTzdIUFJSMVlSS0dHWTlEaDAwVjZaZTRyK1h3ZW5QZW9vdzJpaVhHakl1NktraHQ0cW9hbVJNUk5qdmVQUCtUeFBLKzRmNXZ0dlI4eUMyRnNXMEdqNUJBNEI1TGZVTTB5c2lCcDFhUlRneGJxMGNjRmsvTE96S3E&traceId=1' }
              ]
            }

          ] // end chips 16"
        } // end 16"
      }
    }, // end macbookPro

    // ─────────────────────────────────────────────
    //  Mac mini（M4，教育商店）
    //  官方選購流程：顏色 → 晶片 → 記憶體 → 儲存 → 乙太網路 → 回饋試算
    // ─────────────────────────────────────────────
    macMini: {
      name: 'Mac mini',
      chip: 'M4',
      sizeLabel: 'Mac mini',
      colors: ['銀色'],
      colorImages: {
        'mini': {
          '銀色': 'https://www.apple.com/v/mac-mini/aa/images/overview/hero/hero_static__ehi2pbtt5toy_large.png'
        }
      },
      chips: [
        {
          id: 'M4_10_10',
          name: 'M4',
          detail: '10 核心 CPU / 10 核心 GPU / 16 核心神經網路引擎',
          basePrice: 23400,
          defaultMemory: '16gb',
          defaultStorage: '512gb',
          desc: '小巧機身，適合日常工作、學習與外接螢幕配置。',
          memory: [
            { id: '16gb', name: '16GB', priceAdj: 0, isDefault: true },
            { id: '24gb', name: '24GB', priceAdj: 6300 },
            { id: '32gb', name: '32GB', priceAdj: 12600 }
          ],
          storage: [
            { id: '512gb', name: '512GB', priceAdj: 0, isDefault: true },
            { id: '1tb', name: '1TB', priceAdj: 6300 },
            { id: '2tb', name: '2TB', priceAdj: 18900 }
          ],
          ethernet: [
            { id: 'gigabit', name: 'Gigabit 乙太網路', priceAdj: 0, isDefault: true },
            { id: '10gbe', name: '10Gb 乙太網路', priceAdj: 3150 }
          ]
        },
        {
          id: 'M4_Pro_12_16',
          name: 'M4 Pro',
          detail: '12 核心 CPU / 16 核心 GPU / 16 核心神經網路引擎',
          basePrice: 43400,
          defaultMemory: '24gb',
          defaultStorage: '512gb',
          desc: '具備更高階的 CPU 與 GPU 效能，適合大型專案、影像與開發工作。',
          memory: [
            { id: '24gb', name: '24GB', priceAdj: 0, isDefault: true },
            { id: '48gb', name: '48GB', priceAdj: 12600 },
            { id: '64gb', name: '64GB', priceAdj: 25200 }
          ],
          storage: [
            { id: '512gb', name: '512GB', priceAdj: 0, isDefault: true },
            { id: '1tb', name: '1TB', priceAdj: 6300 },
            { id: '2tb', name: '2TB', priceAdj: 18900 },
            { id: '4tb', name: '4TB', priceAdj: 44100 },
            { id: '8tb', name: '8TB', priceAdj: 94500 }
          ],
          ethernet: [
            { id: 'gigabit', name: 'Gigabit 乙太網路', priceAdj: 0, isDefault: true },
            { id: '10gbe', name: '10Gb 乙太網路', priceAdj: 3150 }
          ]
        }
      ],
      memory: [
        { id: '16gb', name: '16GB', priceAdj: 0, isDefault: true },
        { id: '24gb', name: '24GB', priceAdj: 6300 },
        { id: '32gb', name: '32GB', priceAdj: 12600 }
      ],
      storage: [
        { id: '512gb', name: '512GB', priceAdj: 0, isDefault: true },
        { id: '1tb', name: '1TB', priceAdj: 6300 },
        { id: '2tb', name: '2TB', priceAdj: 18900 }
      ],
      ethernet: [
        { id: 'gigabit', name: 'Gigabit 乙太網路', priceAdj: 0, isDefault: true },
        { id: '10gbe', name: '10Gb 乙太網路', priceAdj: 3150 }
      ]
    },

    // ─────────────────────────────────────────────
    //  iMac 24 吋（M4，教育商店）
    //  官方選購流程：顏色 → M4 晶片 → 自訂配置 → 底座 → 乙太網路 → 滑鼠/觸控板 → 鍵盤
    // ─────────────────────────────────────────────
    imac: {
      name: 'iMac',
      chip: 'M4',
      sizeLabel: '24 吋',
      hasNano: true,
      nanoPrice: 6300,
      chipImage: 'https://www.apple.com.cn/newsroom/images/2024/05/apple-introduces-m4-chip/article/Apple-M4-chip-badge-240507_big.jpg.large.jpg',
      colors: ['藍色', '紫色', '粉紅色', '橙色', '黃色', '綠色', '銀色'],
      colorImages: {
        '24': {
          '藍色': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/imac-touch-id-blue-selection-hero-202410_SW_COLOR?wid=900&hei=900&fmt=jpeg&qlt=90&.v=a0tNS2JIVU5IOTRZR2NHS2ExMnFPc1drZVpPa0NDWCtnOFdlQnJOK1BwLzlVTHI4MGViOXdpd3dNRkd6YTQwTjZuaWpwSkNLVEZlN09OdlhEMDQzak5lVUN5anBMYXArdTZxQXVZNFlaRkViQ1VCSjVTSk5OaFlnRG5jUXVjdG1mbW94YnYxc1YvNXZ4emJGL0IxNFp3',
          '紫色': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/imac-touch-id-purple-selection-hero-202410_SW_COLOR?wid=900&hei=900&fmt=jpeg&qlt=90&.v=Sit0QW1LSHN2S0FGTFhNRzlQTis3V3FKcVRTNUhXNXFBWGJyVHVWR0JFbHZVbWE2TmlLZWJaczVycE94Wnh1NTZZRHk0bzd5UHV2cXVVYWVUUVNPU2dnTU1qVDJZRE9RY2VRblBUT0J5NlZWblBOanQyNVJ3ZExIRURwNnRDRVVyTEhqaFJlNk5MelQyK0xzSUliR3h3',
          '粉紅色': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/imac-touch-id-pink-selection-hero-202410_SW_COLOR?wid=900&hei=900&fmt=jpeg&qlt=90&.v=ajdQVlpRU3VHdjB0UDJNS2JkeUNCakRDb29DR0luODhUTDQ4R1kyQlRvTDlVTHI4MGViOXdpd3dNRkd6YTQwTjZuaWpwSkNLVEZlN09OdlhEMDQzak5lVUN5anBMYXArdTZxQXVZNFlaRkY0TnRHelYzMEU2VGdwVCtJcXF3UzVmbW94YnYxc1YvNXZ4emJGL0IxNFp3',
          '橙色': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/imac-touch-id-orange-selection-hero-202410_SW_COLOR?wid=900&hei=900&fmt=jpeg&qlt=90&.v=VEV1bTh0OXY2UTFBYzdFZFhSN3VtSG11MzVybDZnMC9BMm1UOGVqTXpWbHZVbWE2TmlLZWJaczVycE94Wnh1NTZZRHk0bzd5UHV2cXVVYWVUUVNPU2dnTU1qVDJZRE9RY2VRblBUT0J5NlZKTDlSS3RJUkkxRU9UVkxHTC91eVBZZjBZUnJqWkJIMTlpTHhRVmVhcnd3',
          '黃色': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/imac-vesa-yellow-selection-hero-202410_SW_COLOR?wid=900&hei=900&fmt=jpeg&qlt=90&.v=UGk3R2Vtek1JOW42ODRZbkd5VzI5OCtOK3N2T1FTOUtXQm1OeWdiMWFhbU55WDhZOWZOS1ZKa3FHbGpBV0tzbzhZZnVmZUVMbXdTa0N2Y2J5SnluRXJrNkxqcEdrM2x6OUZ3Z2JnTllhUU9QZWppK1U2MlhnY1BHbWN1VHE3N3Y',
          '綠色': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/imac-vesa-green-selection-hero-202410_SW_COLOR?wid=900&hei=900&fmt=jpeg&qlt=90&.v=TTVrVDloK00wb0F2dWtlSy9VNFZEZ0syUVVrbzBMWk8zd3JPOUtEWkRIWmNnbjlPc1VnOXFpY3A2TFNaeXVpdG5QUHdwZEMwelV4UlRlaVQ5eGpEY0RNZGEwYVUyTzcvZlg1UkxwTzJQS1hmZkpNZFhhd3dMVGNXUjI2alFzVG4',
          '銀色': 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/imac-vesa-silver-selection-hero-202410_SW_COLOR?wid=900&hei=900&fmt=jpeg&qlt=90&.v=Q1lDOTZ0VEhuQXNUK3RNL0lZRWRycytOK3N2T1FTOUtXQm1OeWdiMWFhbU55WDhZOWZOS1ZKa3FHbGpBV0tzbzhZZnVmZUVMbXdTa0N2Y2J5SnluRXJrNkxqcEdrM2x6OUZ3Z2JnTllhUU1jZk1hbGZHNitOcE5EK3hzT3J4Nk8'
        }
      },
      chips: [
        {
          id: 'M4_8_8',
          name: 'M4',
          detail: '8 核心 CPU / 8 核心 GPU / 16 核心神經網路引擎',
          basePrice: 41150,
          defaultMemory: '16gb',
          defaultStorage: '256gb',
          desc: '具備兩個 Thunderbolt 埠',
          thunderbolt: '兩個 Thunderbolt 埠',
          supportsNano: false
        },
        {
          id: 'M4_10_10',
          name: 'M4',
          detail: '10 核心 CPU / 10 核心 GPU / 16 核心神經網路引擎',
          basePrice: 46400,
          defaultMemory: '16gb',
          defaultStorage: '256gb',
          desc: '具備四個 Thunderbolt 埠',
          thunderbolt: '四個 Thunderbolt 埠',
          supportsNano: true
        }
      ],
      memory: [
        { id: '16gb', name: '16GB', priceAdj: 0, isDefault: true },
        { id: '24gb', name: '24GB', priceAdj: 7000, priceByChip: { M4_8_8: 6300, M4_10_10: 7000 } },
        { id: '32gb', name: '32GB', priceAdj: 13300, priceByChip: { M4_10_10: 13300 }, availableChips: ['M4_10_10'], unavailableText: '查看價格與更改項目' }
      ],
      storage: [
        { id: '256gb', name: '256GB', priceAdj: 0, isDefault: true },
        { id: '512gb', name: '512GB', priceAdj: 7000, priceByChip: { M4_8_8: 6300, M4_10_10: 7000 } },
        { id: '1tb', name: '1TB', priceAdj: 13300, priceByChip: { M4_8_8: 12600, M4_10_10: 13300 } },
        { id: '2tb', name: '2TB', priceAdj: 25900, priceByChip: { M4_10_10: 25900 }, availableChips: ['M4_10_10'], unavailableText: '查看價格與更改項目' }
      ],
      stand: [
        { id: 'stand', name: '立架', priceAdj: 0, isDefault: true, desc: '擺放於桌面上，可調整俯仰角度。' },
        { id: 'vesa', name: 'VESA 吊架連接器', priceAdj: 0, desc: '內建設計，方便你固定於牆壁或可調式懸臂上。' }
      ],
      ethernet: [
        { id: 'none', name: '無乙太網路', priceAdj: 0, availableChips: ['M4_8_8'], isDefault: true },
        { id: 'gigabit', name: 'Gigabit 乙太網路埠', priceAdj: 810, priceByChip: { M4_8_8: 810, M4_10_10: 0 }, isDefaultChips: ['M4_10_10'] }
      ],
      pointing: [
        { id: 'magic_mouse', name: '巧控滑鼠', priceAdj: 0, isDefault: true },
        { id: 'magic_trackpad', name: '巧控板', priceAdj: 1500 }
      ],
      keyboard: [
        { id: 'magic_keyboard', name: '巧控鍵盤', priceAdj: 0, availableChips: ['M4_8_8'], isDefault: true, desc: '極為精巧的無線設計。' },
        { id: 'touch_id', name: '含 Touch ID 的巧控鍵盤', priceAdj: 0, availableChips: ['M4_10_10'], isDefaultChips: ['M4_10_10'], desc: '使用你的指紋，提供快速、簡單的認證方式。' },
        { id: 'touch_id_numeric', name: '含 Touch ID 和數字鍵盤的巧控鍵盤', priceAdj: 2300, priceByChip: { M4_8_8: 2300, M4_10_10: 900 }, desc: '延伸鍵盤布局，具備導覽控制鍵。' }
      ]
    } // end imac
  }
};

// 瀏覽器環境：掛到 window；Node 環境：匯出
if (typeof window !== 'undefined') {
  window.BTS_CONFIG = BTS_CONFIG;
} else if (typeof module !== 'undefined') {
  module.exports = BTS_CONFIG;
}
