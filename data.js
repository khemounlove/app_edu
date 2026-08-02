// =====================================================
// data.js - EDU Platform Data Catalog
// =====================================================

// Helper Utility for Media File MIME Types
function getMediaMimeType(filePath) {
  if (!filePath) return 'video/mp4';
  const extension = filePath.split('.').pop().toLowerCase();
  switch (extension) {
    case 'wmv': return 'video/x-ms-wmv';
    case 'mp4': return 'video/mp4';
    case 'webm': return 'video/webm';
    case 'mkv': return 'video/x-matroska';
    case 'mov': return 'video/quicktime';
    case 'avi': return 'video/x-msvideo';
    default: return 'video/mp4';
  }
}

// =====================================================
// 1. Video Courses Catalog ($0.99)
// =====================================================
const coursesData = [
  {
    id: "photoshop",
    title: "Adobe Photoshop",
    icon: "fa-palette",
    badgeText: "៥៩ មេរៀន",
    image: "images/01.jpg",
    description: "ស្ទាត់ជំនាញលើការតែកាត់រូបភាព ការរចនាក្រាហ្វិក ការរៀបចំ Layout និងការគូសផ្សំរូបភាព។",
    telegramLink: "https://t.me/+uttwZvzyPuRhYzM9"
  },
  {
    id: "illustrator",
    title: "Adobe Illustrator",
    icon: "fa-pen-nib",
    badgeText: "៣០ មេរៀន",
    image: "images/02.jpg",
    description: "រៀនបង្កើតរូបភាព Vector រចនា Logo អក្សរក្បាច់ និងការគូសរូបភាពផ្សព្វផ្សាយផ្សេងៗ។",
    telegramLink: "https://t.me/+jAtzDvhfnpNmZTZl"
  },
  {
    id: "premiere",
    title: "Adobe Premiere Pro",
    icon: "fa-film",
    badgeText: "២៥ មេរៀន",
    image: "images/03.jpg",
    description: "ស្ទាត់ជំនាញកាត់តវីដេអូលើ Timeline អាជីព ការសារ៉េពណ៌ (Color Grading) ការតម្រឹមសំឡេង និង Transitions។",
    telegramLink: "https://t.me/+1wzupP_cG683N2Zl"
  },
  {
    id: "aftereffects",
    title: "Adobe After Effects",
    icon: "fa-clapperboard",
    badgeText: "៤០ មេរៀន",
    image: "images/04.jpg",
    description: "បង្កើត Motion Graphics, Kinetic Typography, Effect ពិសេស និងចលនា 3D Camera។",
    telegramLink: "https://t.me/+3jV65ZZfCLRkMTY9"
  },
  {
    id: "cinema4d",
    title: "Cinema 4D",
    icon: "fa-cube",
    badgeText: "៤១ មេរៀន",
    image: "images/05.jpg",
    description: "ការបង្កើតរូបរាង 3D, Texturing, ការដាក់ពន្លឺ, Redshift rendering, និងចលនា Mograph។",
    telegramLink: "https://t.me/+-_jIJauAydU4YzU1"
  },
  {
    id: "html-css",
    title: "HTML & CSS",
    icon: "fa-code",
    badgeText: "២៧ មេរៀន",
    image: "images/06.jpg",
    description: "បង្កើតគេហទំព័រទំនើប ដែលអាចបង្ហាញបានស្អាតលើគ្រប់ឧបករណ៍ដោយប្រើ HTML5 និង CSS3។",
    telegramLink: "https://t.me/+qUVMuty0ER85ZTll"
  },
  {
    id: "java",
    title: "ការសរសេរកូដ Java",
    icon: "fa-mug-hot",
    badgeText: "៥០ មេរៀន",
    image: "images/07.jpg",
    description: "ស្ទាត់ជំនាញលើការសរសេរកូដបែប OOP, Data Structures, Algorithms, និង Syntax របស់ Java។",
    telegramLink: "https://t.me/+ox-1l8eo5BUzM2Q1"
  },
  {
    id: "flutter",
    title: "Flutter & Dart",
    icon: "fa-mobile-screen-button",
    badgeText: "១៩ មេរៀន",
    image: "images/08.jpg",
    description: "អភិវឌ្ឍកម្មវិធីទូរស័ព្ទដៃដើរលើ iOS និង Android ក្នុងពេលតែមួយ ដោយប្រើប្រាស់ Dart និង Flutter។",
    telegramLink: "https://t.me/+X4Fe9IV9fV1lYzU1"
  },
  {
    id: "web-dev-2",
    title: "ការអភិវឌ្ឍគេហទំព័រ កម្រិត II",
    icon: "fa-laptop-code",
    badgeText: "១៤ មេរៀន",
    image: "images/09.jpg",
    description: "រៀន JavaScript កម្រិតខ្ពស់, REST APIs, DOM manipulation, វិធីសាស្ត្រ Async/Await និង Frameworks។",
    telegramLink: "https://t.me/+8PDHgFr6ETUwNGE1"
  },
  {
    id: "net-1",
    title: "ប្រព័ន្ធបណ្តាញ Networking I",
    icon: "fa-network-wired",
    badgeText: "១២ មេរៀន",
    image: "images/010.jpg",
    description: "យល់ដឹងពី OSI Model, ប្រូតូកូល TCP/IP, ការកំណត់ IP Address, Subnetting, និង Routers។",
    telegramLink: "https://t.me/+ItEu9FJM2P1mZWRl"
  },
  {
    id: "win-server",
    title: "Windows Server 2012 R2",
    icon: "fa-server",
    badgeText: "៩ មេរៀន",
    image: "images/011.jpg",
    description: "កំណត់រចនាសម្ព័ន្ធ Active Directory Domain Services, Group Policies, DNS, DHCP, និង File Server។",
    telegramLink: "https://t.me/+QKRlZr0yMpMyNWI1"
  },
  {
    id: "sys-analysis",
    title: "ការវិភាគ និងរចនាប្រព័ន្ធ (System Analysis)",
    icon: "fa-diagram-project",
    badgeText: "៣៤ មេរៀន",
    image: "images/012.jpg",
    description: "រៀនពីវិធីសាស្ត្រ SDLC, ការប្រមូលតម្រូវការប្រព័ន្ធ, ដ្យាក្រាម UML, ERD, និងរចនាសម្ព័ន្ធប្រព័ន្ធ។",
    telegramLink: "https://t.me/+P8FHSTGwaTc3Y2M1"
  },
  {
    id: "comp-acct",
    title: "គណនេយ្យកុំព្យូទ័រ (Computer Accounting)",
    icon: "fa-calculator",
    badgeText: "៣២ មេរៀន",
    image: "images/013.jpg",
    description: "ស្ទាត់ជំនាញលើការកត់ត្រាបញ្ជីជើងស្វ័យប្រវត្តិ, គណនេយ្យតាម QuickBooks/Excel, ប្រាក់បៀវត្ស និងរបាយការណ៍ហិរញ្ញវត្ថុ។",
    telegramLink: "https://t.me/+2AibrYOwAIdiMWFl"
  },
  {
    id: "capcut-editing",
    title: "ការកាត់តវីដេអូជាមួយ CapCut",
    badgeText: "៣១ មេរៀន",
    icon: "fa-scissors",
    image: "images/014.jpg",
    description: "រៀនកាត់តវីដេអូតាមទូរស័ព្ទដៃ និងកុំព្យូទ័រ បង្កើត Effect ស្អាតៗ និងសំឡេងទាក់ទាញសម្រាប់ TikTok, Reels & Shorts។",
    telegramLink: "https://t.me/+rqfT1-SCyfo5MmM1"
  },
  {
    id: "advanced-excel",
    title: "ជំនាញ Microsoft Excel កម្រិតខ្ពស់",
    badgeText: "២៤ មេរៀន",
    icon: "fa-file-excel",
    image: "images/015.jpg",
    description: "ស្ទាត់ជំនាញប្រើប្រាស់រូបមន្ត VLOOKUP, XLOOKUP, Pivot Table, IF Statements និងការបង្កើត Dashboard រាយការណ៍ទិន្នន័យ។",
    telegramLink: "https://t.me/+v9Q0reQErbVjNGQ1"
  }
];

// =====================================================
// 2. Software & AI Pro Catalog ($14.99)
// =====================================================
const softwareData = [
  {
    id: "ai-pro-all-in-one",
    title: "Adobe Photoshop",
    badgeText: "ps",
    price: "$0.99",
    image: "images/01.jpg",
    description: "ទទួលបាន AI Pro Account (Gemini Advanced, ChatGPT Plus, Grok Pro) សម្រាប់ជួយការងារ សរសេរកូដ និងរចនាក្រាហ្វិក។",
    telegramLink: "https://t.me/+-pGl5a3fg6tlNTg9"
  },
  {
    id: "adobe-master-collection",
    title: "Adobe Illustrator",
    badgeText: "AI",
    price: "$0.99",
    image: "images/02.jpg",
    description: "Photoshop, Illustrator, Premiere Pro, After Effects Full Version ប្រើប្រាស់បានរហូត គ្មានពាណិជ្ជកម្ម។",
    telegramLink: "https://t.me/+-pGl5a3fg6tlNTg9"
  },
  {
    id: "cinema4d-redshift",
    title: "Cinema 4D + Redshift Render Engine",
    badgeText: "3D Design",
    price: "$0.99",
    image: "images/05.jpg",
    description: "កម្មវិធីឌីហ្សាញ 3D និង Engine Render កម្រិតខ្ពស់សម្រាប់អ្នកធ្វើ Motion Graphics និង 3D VFX។",
    telegramLink: "https://t.me/+-pGl5a3fg6tlNTg9"
  },
  {
    id: "capcut-pro-pc-mobile",
    title: "CapCut Pro (PC & Mobile)",
    badgeText: "Pro Unlocked",
    price: "$0.99",
    image: "images/014.jpg",
    description: "CapCut Pro ប្រើបានទាំងលើទូរស័ព្ទ និងកុំព្យូទ័រ មាន Effect, Transition, និង AI Auto Caption ពេញលេញ។",
    telegramLink: "https://t.me/+-pGl5a3fg6tlNTg9"
  },
  {
    id: "Premiere Pro",
    title: "Microsoft Office 365",
    badgeText: "Office ",
    price: "$0.99",
    image: "images/111.png",
    description: "Word, Excel, PowerPoint, Outlook កម្រិត Pro ដើរជាមួយ AI Copilot ជួយបង្កើតស្លាយ និងរូបមន្ត Excel។",
    telegramLink: "https://t.me/+-pGl5a3fg6tlNTg9"
  },
  {
    id: "dev-tools-suite",
    title: "Developer Tools & IDEs Pack",
    badgeText: "Dev Suite",
    price: "$0.99",
    image: "images/06.jpg",
    description: "កញ្ចប់ Tool សរសេរកូដ (JetBrains All Products, VS Code Pro Plugins, Database Tools)។",
    telegramLink: "https://t.me/+-pGl5a3fg6tlNTg9"
  }
];

// Export Modules if required
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { coursesData, softwareData, getMediaMimeType };
}