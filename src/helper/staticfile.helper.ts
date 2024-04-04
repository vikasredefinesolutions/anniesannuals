import { readFile } from 'fs/promises';
import storeDetails from '@/staticData/storeDetails.json';
import adminConfigs from '@/staticData/adminConfigs.json';
import homePageMetaData from '@/staticData/homePage/pageMetaData.json';
import headerSubMenu from '@/staticData/headerSubMenu.json';
import { updateStoreDetails } from '@/api/jsonServices/updateStoreDetails';
import { updateHeaderSubmenu } from '@/api/jsonServices/updateHeaderSubmenu';
import { getAdminConfig } from '@/shared/apis/common/getAdminConfig';
import { getPageType } from '@/shared/apis/store/getPageType';

export type tStoreDetailsFile = typeof storeDetails;
export type tHeaderSubMenuFile = typeof headerSubMenu;
export type tAdminConfigs = typeof adminConfigs;
export type tHomePageMetaData = typeof homePageMetaData;

export const getStaticHeaderSubMenu = async (): Promise<tHeaderSubMenuFile> => {
  const headerSubMenuFile = '{
  "perennials-biennials": {
    "topicId": 97,
    "title": "Perennials & Biennials",
    "customCollectionUrl": "",
    "seName": "perennials-biennials",
    "items": [
      {
        "id": 211,
        "categoryName": "New",
        "seName": "perennials-biennials-new",
        "customSEName": "new",
        "displayOrder": 1,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/154/category_73.png",
        "altTag": "New",
        "titleTag": "New"
      },
      {
        "id": 212,
        "categoryName": "California Natives",
        "seName": "perennials-biennials-california-natives",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/155/category_72.png",
        "altTag": "CA Natives",
        "titleTag": "CA Natives"
      },
      {
        "id": 233,
        "categoryName": "Alstroemeria",
        "seName": "perennials-biennials-alstroemeria",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 590,
        "categoryName": "Campanula",
        "seName": "perennials-biennials-campanula",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 227,
        "categoryName": "Delphinium",
        "seName": "perennials-biennials-delphinium",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 496,
        "categoryName": "Good for Poliantors & Wildlife",
        "seName": "perennials-biennials-good-for-poliantors-wildlife",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/445/category_127.jpg",
        "altTag": "Good for Poliantors & Wildlife",
        "titleTag": "Good for Poliantors & Wildlife"
      },
      {
        "id": 214,
        "categoryName": "Drought Tolerant",
        "seName": "perennials-biennials-drought-tolerant",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/157/category_74.png",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 591,
        "categoryName": "Digitalis",
        "seName": "perennials-biennials-digitalis",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 215,
        "categoryName": "Deer Resistant",
        "seName": "perennials-biennials-deer-resistant",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/158/category_75.png",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 236,
        "categoryName": " Eschscholzia",
        "seName": "perennials-biennials-eschscholzia",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 216,
        "categoryName": "Sale",
        "seName": "perennials-biennials-sale",
        "customSEName": "sale",
        "displayOrder": 6,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/159/category_76.jpg",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 238,
        "categoryName": " Hollyhock",
        "seName": "perennials-biennials-hollyhock",
        "customSEName": "",
        "displayOrder": 6,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 592,
        "categoryName": "Linaria",
        "seName": "perennials-biennials-linaria",
        "customSEName": "",
        "displayOrder": 7,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 403,
        "categoryName": "Lupinus",
        "seName": "perennials-biennials-lupinus",
        "customSEName": "",
        "displayOrder": 8,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 593,
        "categoryName": "Pelargonium",
        "seName": "perennials-biennials-pelargonium",
        "customSEName": "",
        "displayOrder": 9,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 232,
        "categoryName": "Scabiosa",
        "seName": "perennials-biennials-scabiosa",
        "customSEName": "",
        "displayOrder": 10,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 240,
        "categoryName": " Verbascum",
        "seName": "perennials-biennials-verbascum",
        "customSEName": "",
        "displayOrder": 11,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 594,
        "categoryName": "Viola",
        "seName": "perennials-biennials-viola",
        "customSEName": "",
        "displayOrder": 12,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      }
    ],
    "type": "dynamic"
  },
  "annual": {
    "topicId": 221,
    "title": "Annuals",
    "customCollectionUrl": "",
    "seName": "annual",
    "items": [
      {
        "id": 222,
        "categoryName": "New",
        "seName": "/life%20span/annuals/new",
        "customSEName": "new",
        "displayOrder": 1,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/165/category_77.png",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 556,
        "categoryName": "Agrostemma",
        "seName": "annual-agrostemma",
        "customSEName": "",
        "displayOrder": 1,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 223,
        "categoryName": "California Natives",
        "seName": "annuals-california-natives",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 258,
        "categoryName": " Centaurea",
        "seName": "annuals-centaurea",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 244,
        "categoryName": "Good for Poliantors & Wildlife",
        "seName": "annuals-good-for-poliantors-wildlife",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/187/category_131.jpg",
        "altTag": "Pollinators",
        "titleTag": "Pollinators"
      },
      {
        "id": 261,
        "categoryName": "Gilia",
        "seName": "annuals-gilia",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 245,
        "categoryName": "Drought Tolerant",
        "seName": "annuals-drought-tolerant",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/188/category_62.jpg",
        "altTag": "Drought Tolerant",
        "titleTag": "Drought Tolerant"
      },
      {
        "id": 595,
        "categoryName": "Lathyrus",
        "seName": "annual-lathyrus",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 246,
        "categoryName": "Deer Resistant",
        "seName": "annuals-deer-resistant",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/189/category_132.jpg",
        "altTag": "Deer Resistant",
        "titleTag": "Deer Resistant"
      },
      {
        "id": 262,
        "categoryName": " Layia",
        "seName": "annuals-layia",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 247,
        "categoryName": "Sale",
        "seName": "annuals-sale",
        "customSEName": "sale",
        "displayOrder": 6,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 253,
        "categoryName": "Lobelia",
        "seName": "annuals-lobelia",
        "customSEName": "",
        "displayOrder": 6,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 557,
        "categoryName": "Lupinus",
        "seName": "annual-lupinus",
        "customSEName": "",
        "displayOrder": 7,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 254,
        "categoryName": "Nemophila",
        "seName": "annuals-nemophila",
        "customSEName": "",
        "displayOrder": 8,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 555,
        "categoryName": "Nicotiana",
        "seName": "annual-nicotiana",
        "customSEName": "",
        "displayOrder": 9,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 558,
        "categoryName": "Nigella",
        "seName": "annual-nigella",
        "customSEName": "",
        "displayOrder": 10,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 596,
        "categoryName": "Papaver",
        "seName": "annual-papaver",
        "customSEName": "",
        "displayOrder": 11,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 567,
        "categoryName": "Viola",
        "seName": "annual-viola",
        "customSEName": "",
        "displayOrder": 12,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      }
    ],
    "type": "dynamic"
  },
  "groundcovers": {
    "topicId": 266,
    "title": "Groundcovers",
    "customCollectionUrl": "",
    "seName": "groundcovers",
    "items": [
      {
        "id": 279,
        "categoryName": "New",
        "seName": "/uses/groundcovers/new",
        "customSEName": "new",
        "displayOrder": 1,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 561,
        "categoryName": "Achillea",
        "seName": "ground-covers-achillea",
        "customSEName": "",
        "displayOrder": 1,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 280,
        "categoryName": "California Natives",
        "seName": "ground-covers-california-natives",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 285,
        "categoryName": "Ajuga",
        "seName": "ground-covers-ajuga",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 281,
        "categoryName": "Good for Poliantors & Wildlife",
        "seName": "ground-covers-good-for-poliantors-wildlife",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 562,
        "categoryName": "Arctotis",
        "seName": "ground-covers-arctotis",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 282,
        "categoryName": "Drought Tolerant",
        "seName": "ground-covers-drought-tolerant",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/224/category_137.jpg",
        "altTag": "Drought Tolerant",
        "titleTag": "Drought Tolerant"
      },
      {
        "id": 563,
        "categoryName": "Cotula",
        "seName": "ground-covers-cotula",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 283,
        "categoryName": "Deer Resistant",
        "seName": "ground-covers-deer-resistant",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 287,
        "categoryName": "Dianthus",
        "seName": "ground-covers-dianthus",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 284,
        "categoryName": "Sale",
        "seName": "ground-covers-sale",
        "customSEName": "sale",
        "displayOrder": 6,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 410,
        "categoryName": "Fragaria",
        "seName": "ground-covers-fragaria",
        "customSEName": "",
        "displayOrder": 6,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 411,
        "categoryName": "Heuchera",
        "seName": "ground-covers-heuchera",
        "customSEName": "",
        "displayOrder": 7,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 289,
        "categoryName": "Lobelia",
        "seName": "ground-covers-lobelia",
        "customSEName": "",
        "displayOrder": 8,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 564,
        "categoryName": "Oenothera",
        "seName": "ground-covers-oenothera",
        "customSEName": "",
        "displayOrder": 9,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 565,
        "categoryName": "Osteospermum",
        "seName": "ground-covers-osteospermum",
        "customSEName": "",
        "displayOrder": 10,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 417,
        "categoryName": "Oxalis",
        "seName": "ground-covers-oxalis",
        "customSEName": "",
        "displayOrder": 11,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 420,
        "categoryName": "Sisyrinchium",
        "seName": "ground-covers-sisyrinchium",
        "customSEName": "",
        "displayOrder": 11,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 554,
        "categoryName": "Lippia",
        "seName": "ground-covers-lippia",
        "customSEName": "",
        "displayOrder": 12,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      }
    ],
    "type": "dynamic"
  },
  "shrubs-trees": {
    "topicId": 267,
    "title": "Shrubs & Trees",
    "customCollectionUrl": "",
    "seName": "shrubs-trees",
    "items": [
      {
        "id": 436,
        "categoryName": "New",
        "seName": "shrubs-trees-new",
        "customSEName": "new",
        "displayOrder": 1,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 450,
        "categoryName": "Abutilon",
        "seName": "shrubs-trees-abutilon",
        "customSEName": "",
        "displayOrder": 1,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 437,
        "categoryName": "California Natives",
        "seName": "shrubs-trees-california-natives",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 584,
        "categoryName": "Buddleja",
        "seName": "shrubs-trees-buddleja",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 438,
        "categoryName": "Good for Poliantors & Wildlife",
        "seName": "shrubs-trees-good-for-poliantors-wildlife",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 585,
        "categoryName": "Cantua",
        "seName": "shrubs-trees-cantua",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 442,
        "categoryName": "Drought Tolerant",
        "seName": "shrubs-trees-drought-tolerant",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/388/category_134.jpg",
        "altTag": "Drought Tolerant",
        "titleTag": "Drought Tolerant"
      },
      {
        "id": 458,
        "categoryName": "Ceanothus",
        "seName": "shrubs-trees-ceanothus",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 445,
        "categoryName": "Deer Resistant",
        "seName": "shrubs-trees-deer-resistant",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/389/category_106.jpg",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 586,
        "categoryName": "Clianthus",
        "seName": "shrubs-trees-clianthus",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 448,
        "categoryName": "Sale",
        "seName": "shrubs-trees-sale",
        "customSEName": "sale",
        "displayOrder": 6,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 460,
        "categoryName": "Cuphea",
        "seName": "shrubs-trees-cuphea",
        "customSEName": "",
        "displayOrder": 6,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 461,
        "categoryName": "Echium",
        "seName": "shrubs-trees-echium",
        "customSEName": "",
        "displayOrder": 7,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 465,
        "categoryName": "Fuchsia",
        "seName": "shrubs-trees-fuchsia",
        "customSEName": "",
        "displayOrder": 8,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 587,
        "categoryName": "Hebe",
        "seName": "shrubs-trees-hebe",
        "customSEName": "",
        "displayOrder": 9,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 469,
        "categoryName": "Impatiens",
        "seName": "shrubs-trees-impatiens",
        "customSEName": "",
        "displayOrder": 10,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 589,
        "categoryName": "Psoralea",
        "seName": "shrubs-trees-psoralea",
        "customSEName": "",
        "displayOrder": 11,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 482,
        "categoryName": "Salvia",
        "seName": "shrubs-trees-salvia",
        "customSEName": "",
        "displayOrder": 12,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      }
    ],
    "type": "dynamic"
  },
  "grasses-and-foliage": {
    "topicId": 268,
    "title": "Grasses & Foliage",
    "customCollectionUrl": "",
    "seName": "grasses-and-foliage",
    "items": [
      {
        "id": 414,
        "categoryName": "New",
        "seName": "grasses-and-foliage-new",
        "customSEName": "new",
        "displayOrder": 1,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 415,
        "categoryName": "Aeonium",
        "seName": "grasses-and-foliage-aeonium",
        "customSEName": "",
        "displayOrder": 1,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 419,
        "categoryName": " Agave",
        "seName": "grasses-and-foliage-agave",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 422,
        "categoryName": "California Natives",
        "seName": "grasses-and-foliage-california-natives",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 425,
        "categoryName": "Good for Poliantors & Wildlife",
        "seName": "grasses-and-foliage-good-for-poliantors-wildlife",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 568,
        "categoryName": "Beschorneria",
        "seName": "grasses-and-foliage-beschorneria",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 428,
        "categoryName": "Drought Tolerant",
        "seName": "grasses-and-foliage-drought-tolerant",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/374/category_104.jpg",
        "altTag": "Drought Tolerant",
        "titleTag": "Drought Tolerant"
      },
      {
        "id": 569,
        "categoryName": "Doryanthes",
        "seName": "grasses-and-foliage-doryanthes",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 431,
        "categoryName": "Deer Resistant",
        "seName": "grasses-and-foliage-deer-resistant",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 570,
        "categoryName": "Deschampsia",
        "seName": "grasses-and-foliage-deschampsia",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 429,
        "categoryName": "Festuca",
        "seName": "grasses-and-foliage-festuca",
        "customSEName": "",
        "displayOrder": 6,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 434,
        "categoryName": "Sale",
        "seName": "grasses-and-foliage-sale",
        "customSEName": "sale",
        "displayOrder": 6,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 571,
        "categoryName": "Iris",
        "seName": "grasses-and-foliage-iris",
        "customSEName": "",
        "displayOrder": 7,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 553,
        "categoryName": "Lotus",
        "seName": "grasses-and-foliage-lotus",
        "customSEName": "",
        "displayOrder": 8,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 551,
        "categoryName": "Lysimachia",
        "seName": "grasses-and-foliage-lysimachia",
        "customSEName": "",
        "displayOrder": 9,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 430,
        "categoryName": " Muhlenbergia",
        "seName": "grasses-and-foliage-muhlenbergia",
        "customSEName": "",
        "displayOrder": 10,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 552,
        "categoryName": "Oscularia",
        "seName": "grasses-and-foliage-oscularia",
        "customSEName": "",
        "displayOrder": 11,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 572,
        "categoryName": "Stipa",
        "seName": "grasses-and-foliage-stipa",
        "customSEName": "",
        "displayOrder": 12,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      }
    ],
    "type": "dynamic"
  },
  "vines": {
    "topicId": 269,
    "title": "Vines",
    "customCollectionUrl": "",
    "seName": "vines",
    "items": [
      {
        "id": 439,
        "categoryName": "New",
        "seName": "vines-new",
        "customSEName": "new",
        "displayOrder": 1,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 573,
        "categoryName": "Convolulus",
        "seName": "vines-convolulus",
        "customSEName": "",
        "displayOrder": 1,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 440,
        "categoryName": "California Natives",
        "seName": "vines-california-natives",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 574,
        "categoryName": "Dipogon",
        "seName": "vines-dipogon",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 441,
        "categoryName": "Good for Poliantors & Wildlife",
        "seName": "vines-good-for-poliantors-wildlife",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 575,
        "categoryName": "Jasminium ",
        "seName": "vines-jasminium-",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 444,
        "categoryName": "Drought Tolerant",
        "seName": "vines-drought-tolerant",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/390/category_136.jpg",
        "altTag": "Drought Tolerant",
        "titleTag": "Drought Tolerant"
      },
      {
        "id": 576,
        "categoryName": "Lathyrus",
        "seName": "vines-lathyrus",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 446,
        "categoryName": "Deer Resistant",
        "seName": "vines-deer-resistant",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 577,
        "categoryName": "Pandorea",
        "seName": "vines-pandorea",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 447,
        "categoryName": "Sale",
        "seName": "vines-sale",
        "customSEName": "sale",
        "displayOrder": 6,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 454,
        "categoryName": "Passiflora",
        "seName": "vines-passiflora",
        "customSEName": "",
        "displayOrder": 6,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      }
    ],
    "type": "dynamic"
  },
  "succulents": {
    "topicId": 270,
    "title": "Succulents",
    "customCollectionUrl": "",
    "seName": "succulents",
    "items": [
      {
        "id": 463,
        "categoryName": "New",
        "seName": "succulents-new",
        "customSEName": "new",
        "displayOrder": 1,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 475,
        "categoryName": "Aeonium",
        "seName": "succulents-aeonium",
        "customSEName": "",
        "displayOrder": 1,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 464,
        "categoryName": "California Natives",
        "seName": "succulents-california-natives",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 476,
        "categoryName": "Agave",
        "seName": "succulents-agave",
        "customSEName": "",
        "displayOrder": 2,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 466,
        "categoryName": "Good for Poliantors & Wildlife",
        "seName": "succulents-good-for-poliantors-wildlife",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 578,
        "categoryName": "Drosanthemum",
        "seName": "succulents-drosanthemum",
        "customSEName": "",
        "displayOrder": 3,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 468,
        "categoryName": "Drought Tolerant",
        "seName": "succulents-drought-tolerant",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "/annies/1/category/413/category_135.jpg",
        "altTag": "Drought Tolerant",
        "titleTag": "Drought Tolerant"
      },
      {
        "id": 483,
        "categoryName": " Echeveria",
        "seName": "succulents-echeveria",
        "customSEName": "",
        "displayOrder": 4,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 470,
        "categoryName": "Deer Resistant",
        "seName": "succulents-deer-resistant",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 579,
        "categoryName": "Graptoveria",
        "seName": "succulents-graptoveria",
        "customSEName": "",
        "displayOrder": 5,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 472,
        "categoryName": "Sale",
        "seName": "succulents-sale",
        "customSEName": "sale",
        "displayOrder": 6,
        "isPopular": false,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 580,
        "categoryName": "Kalanchoe",
        "seName": "succulents-kalanchoe",
        "customSEName": "",
        "displayOrder": 6,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 581,
        "categoryName": "Lampranthus",
        "seName": "succulents-lampranthus",
        "customSEName": "",
        "displayOrder": 7,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 485,
        "categoryName": " Lewisia",
        "seName": "succulents-lewisia",
        "customSEName": "",
        "displayOrder": 8,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 582,
        "categoryName": "Oscularia",
        "seName": "succulents-oscularia",
        "customSEName": "",
        "displayOrder": 9,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 486,
        "categoryName": "Sedum",
        "seName": "succulents-sedum",
        "customSEName": "",
        "displayOrder": 10,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 583,
        "categoryName": "Stapelia",
        "seName": "succulents-stapelia",
        "customSEName": "",
        "displayOrder": 11,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      },
      {
        "id": 487,
        "categoryName": "Yucca",
        "seName": "succulents-yucca",
        "customSEName": "",
        "displayOrder": 12,
        "isPopular": true,
        "categoryCustomFields": [],
        "categoryImagePath": "",
        "altTag": "",
        "titleTag": ""
      }
    ],
    "type": "dynamic"
  },
  "shop-the-garden": {
    "type": "none",
    "title": "Shop the Garden",
    "topicId": 257,
    "items": null,
    "customCollectionUrl": "",
    "seName": "shop-the-garden"
  },
  "resources": {
    "title": "Resources",
    "customCollectionUrl": "",
    "seName": "resources",
    "items": "<div class=\"absolute top-full left-0 right-0 sm:text-[14px] z-50 border-t border-t-[#295B4C]\" x-show=\"menu9\">\n<div class=\"relative bg-[#EDFFFA]\">\n<div class=\"container mx-auto\">\n<div class=\"grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 pt-[37px] pb-[60px]\">\n<div class=\"col-span-1\">\n<div class=\"text-[18px] font-bold font-sub text-body-color\"><a href='resources.html'>Resources</a></div>\n\n<ul class=\"text-[13px] lg:text-[14px] font-sub font-semibold\">\n\t<li class=\"pt-[20px]\"><a class=\"inline-block text-anchor hover:text-anchor-hover\" href=\"/us-hardiness-zones.html\" title=\"\">US Hardiness Zones</a></li>\n\t<li class=\"pt-[20px]\"><a class=\"inline-block text-anchor hover:text-anchor-hover\" href=\"/planting-guides.html\" title=\"\">Planting Guides</a></li>\n\t<li class=\"pt-[20px]\"><a class=\"inline-block text-anchor hover:text-anchor-hover\" href=\"product-listing.html\" title=\"\">Shop by Uses and Features</a></li>\n\t<li class=\"pt-[20px]\"><a class=\"inline-block text-anchor hover:text-anchor-hover\" href=\"/product-listing-a-z.html\" title=\"\">Shop A-Z</a></li>\n\t<li class=\"pt-[20px]\"><a class=\"inline-block text-anchor hover:text-anchor-hover\" href=\"/videos.html\" title=\"\">Gardening Videos</a></li>\n\t<li class=\"pt-[20px]\"><a class=\"inline-block text-anchor hover:text-anchor-hover\" href=\"/blog.html\" title=\"\">Gardening Blog</a></li>\n\t<li class=\"pt-[20px]\"><a class=\"inline-block text-anchor hover:text-anchor-hover\" href=\"product-listing.html\" title=\"\">Catalogues</a></li>\n\t<li class=\"pt-[20px]\"><a class=\"inline-block text-anchor hover:text-anchor-hover\" href=\"/wishlist.html\" title=\"\">Wish List</a></li>\n</ul>\n</div>\n\n<div class=\"col-span-1 lg:col-span-3 xl:col-span-5\">\n<div class=\"text-[18px] font-bold font-sub text-body-color\">Gardening Tips &amp; Guidance</div>\n\n<div class=\"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[27px]\">\n<div class=\"col-span-1 lg:col-span-1\">\n<div class=\"mt-[20px]\"><img alt=\"\" class=\"rounded-tl-xl rounded-br-xl overflow-hidden\" src=\"https://redefinecommerce.blob.core.windows.net/annies/temp/1/category/0/f13330de-5e28-4476-ab88-bfe9271bb57c.png\" /></div>\n\n<div class=\"mt-[15px]\"><a class=\"inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover\" href=\"/growing-zone-guide.html\" title=\"\">Growing Zone Guide</a></div>\n</div>\n\n<div class=\"col-span-1 lg:col-span-1\">\n<div class=\"mt-[20px]\"><img alt=\"\" class=\"rounded-tl-xl rounded-br-xl overflow-hidden\" src=\"https://redefinecommerce.blob.core.windows.net/annies/temp/1/category/0/a995f8fa-aa2f-44a8-96c2-44b38dfb1cb3.png\" /></div>\n\n<div class=\"mt-[15px]\"><a class=\"inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover\" href=\"/plant-finder.html\" title=\"\">Find Your Plant</a></div>\n</div>\n\n<div class=\"col-span-1 lg:col-span-1\">\n<div class=\"mt-[20px]\"><img alt=\"\" class=\"rounded-tl-xl rounded-br-xl overflow-hidden\" src=\"https://redefinecommerce.blob.core.windows.net/annies/temp/1/category/0/c1417ad8-2a76-43b6-87fe-8ecb21bf71c0.png\" /></div>\n\n<div class=\"mt-[15px]\"><a class=\"inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover\" href=\"product-listing.html\" title=\"\">Plant Types</a></div>\n</div>\n\n<div class=\"col-span-1 lg:col-span-1\">\n<div class=\"mt-[20px]\"><img alt=\"\" class=\"rounded-tl-xl rounded-br-xl overflow-hidden\" src=\"https://redefinecommerce.blob.core.windows.net/annies/temp/1/category/0/8cdb3aff-950f-4999-8532-45f43479ea38.png\" /></div>\n\n<div class=\"mt-[15px]\"><a class=\"inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover\" href=\"product-listing.html\" title=\"\">Planting Guides</a></div>\n</div>\n\n<div class=\"col-span-1 lg:col-span-1\">\n<div class=\"mt-[20px]\"><img alt=\"\" class=\"rounded-tl-xl rounded-br-xl overflow-hidden\" src=\"https://redefinecommerce.blob.core.windows.net/annies/temp/1/category/0/beae791a-c61a-44d5-a9d0-eb35aebc0997.png\" /></div>\n\n<div class=\"mt-[15px]\"><a class=\"inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover\" href=\"product-listing.html\" title=\"\">Gardening Library</a></div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n",
    "topicId": 272,
    "type": "custom"
  },
  "gifts-supplies": {
    "title": "Gifts & Supplies",
    "customCollectionUrl": "",
    "seName": "gifts-supplies",
    "items": "<div class=\"absolute top-full left-0 right-0 sm:text-[14px] z-50 border-t border-t-[#295B4C] bg-black text-white\">\n<div class=\"relative bg-[#EEF3FF]\">\n<div class=\"container mx-auto\">\n<div class=\"pt-[37px] pb-[60px]\">\n<div class=\"text-[18px] font-bold font-sub text-body-color\"><a href='/gifts-supplies.html'> Gifts &amp; Supplies</a></div>\n\n<div class=\"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[27px]\">\n<div class=\"col-span-1 lg:col-span-1\">\n<div class=\"mt-[20px]\"><img alt=\"Gift Cards\" class=\"rounded-tl-xl rounded-br-xl overflow-hidden\" src=\"https://redefinecommerce.blob.core.windows.net/annies/temp/1/category/0/bdd014fc-d7d3-4a7c-9b95-194d0a5c253d.png\" /></div>\n\n<div class=\"mt-[15px]\"><a class=\"inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover\" href=\"/gift-card-listing.html\" target=\"_self\" title=\"\">Gift Cards</a></div>\n</div>\n\n<div class=\"col-span-1 lg:col-span-1\">\n<div class=\"mt-[20px]\"><a href=\"/search/result?q=Apparel\"><img alt=\"Apparel\" class=\"rounded-tl-xl rounded-br-xl overflow-hidden\" src=\"https://redefinecommerce.blob.core.windows.net/annies/temp/1/category/0/a85389e8-2a02-4038-9bbf-8d1766b18e2c.png\" /></a></div>\n\n<div class=\"mt-[15px]\"><a class=\"inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover\" href=\"/search/result?q=Apparel\" target=\"_self\" title=\"\">Apparel</a></div>\n</div>\n\n<div class=\"col-span-1 lg:col-span-1\">\n<div class=\"mt-[20px]\"><a href=\"/search/result?q=Arts%20%26%20Books\"><img alt=\"Arts &amp; Books\" class=\"rounded-tl-xl rounded-br-xl overflow-hidden\" src=\"https://redefinecommerce.blob.core.windows.net/annies/temp/1/category/0/89940316-5bdf-4536-8fe5-7537a45914fc.png\" /></a></div>\n\n<div class=\"mt-[15px]\"><a class=\"inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover\" href=\"/search/result?q=Arts%20%26%20Books\" target=\"_self\" title=\"\">Arts &amp; Books</a></div>\n</div>\n\n<div class=\"col-span-1 lg:col-span-1\">\n<div class=\"mt-[20px]\"><a href=\"/search/result?q=Bath%20%26%20Body\"><img alt=\"Bath &amp; Body\" class=\"rounded-tl-xl rounded-br-xl overflow-hidden\" src=\"https://redefinecommerce.blob.core.windows.net/annies/temp/1/category/0/eeb8f500-b8a7-4acd-bb0e-79d32b26faef.png\" /></a></div>\n\n<div class=\"mt-[15px]\"><a class=\"inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover\" href=\"/search/result?q=Bath%20%26%20Body\" target=\"_self\" title=\"\">Bath &amp; Body</a></div>\n</div>\n\n<div class=\"col-span-1 lg:col-span-1\">\n<div class=\"mt-[20px]\"><a href=\"/search/result?q=Garden%20Supplies\"><img alt=\"Garden Supplies\" class=\"rounded-tl-xl rounded-br-xl overflow-hidden\" src=\"https://redefinecommerce.blob.core.windows.net/annies/temp/1/category/0/b5f82c11-d528-4de1-bb49-f73e44b634b7.png\" /></a></div>\n\n<div class=\"mt-[15px]\"><a class=\"inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover\" href=\"/search/result?q=Garden%20Supplies\" target=\"_self\" title=\"\">Garden Supplies</a></div>\n</div>\n\n<div class=\"col-span-1 lg:col-span-1\">\n<div class=\"mt-[20px]\"><a href=\"search/result?q=Home%20Goods\"><img alt=\"Home Goods\" class=\"rounded-tl-xl rounded-br-xl overflow-hidden\" src=\"https://redefinecommerce.blob.core.windows.net/annies/temp/1/category/0/405270d3-59a7-458d-b099-a984d14d9656.png\" target=\"_self\" /></a></div>\n\n<div class=\"mt-[15px]\"><a class=\"inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover\" href=\"search/result?q=Home%20Goods\" target=\"_self\" title=\"\">Home Goods</a></div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n",
    "topicId": 273,
    "type": "custom"
  },
  "sale": {
    "type": "none",
    "title": "Sale",
    "topicId": 278,
    "items": null,
    "customCollectionUrl": "",
    "seName": "sale"
  }
}'
;

  if (!headerSubMenuFile) throw new Error('Header sub menu file not found');
  const headerSubMenu: tHeaderSubMenuFile = JSON.parse(headerSubMenuFile);
  if (!headerSubMenu) throw new Error('Header sub menu file not found');
  return headerSubMenu;
};

export const getStaticStoreDetails = async (): Promise<tStoreDetailsFile> => {
  const storeDetailsFile = await readFile(
    process.cwd() + '/src/staticData/storeDetails.json',
    'utf-8',
  );

  if (!storeDetailsFile) throw new Error('Store details file not found');
  let storeDetails: tStoreDetailsFile = JSON.parse(storeDetailsFile.toString());
  //
  if (!storeDetails?.storeId || storeDetails?.storeId === 0) {
    storeDetails = await updateStoreDetails();
    await updateHeaderSubmenu();
  }
  //
  return storeDetails;
};

export const getStaticAdminConfigs = async (): Promise<tAdminConfigs> => {
  const adminConfigsFile = await readFile(
    process.cwd() + '/src/staticData/adminConfigs.json',
    'utf-8',
  );

  if (!adminConfigsFile) throw new Error('Admin Config file not found');
  let adminConfigs: tAdminConfigs = JSON.parse(adminConfigsFile.toString());
  //
  if (!adminConfigs?.gardenID || adminConfigs?.gardenID === 0) {
    const storeDetails = await getStaticStoreDetails();
    adminConfigs = await getAdminConfig(storeDetails.storeId, 'GardenId');
  }
  //
  return adminConfigs;
};

export const getStaticPageMetaDataForHomePage =
  async (): Promise<tHomePageMetaData> => {
    const homePageMetaDataFile = await readFile(
      process.cwd() + '/src/staticData/homePage/pageMetaData.json',
      'utf-8',
    );

    if (!homePageMetaDataFile) throw new Error('Admin Config file not found');
    let pageMetaData: tHomePageMetaData = JSON.parse(
      homePageMetaDataFile.toString(),
    );
    //
    if (!pageMetaData?.id || pageMetaData?.id === 0) {
      const storeDetails = await getStaticStoreDetails();
      pageMetaData = await getPageType(storeDetails.storeId, '/');
    }
    //
    return pageMetaData;
  };
