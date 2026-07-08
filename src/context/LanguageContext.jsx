import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Language Context
const LanguageContext = createContext();

// Translation Dictionary
const translations = {
  en: {
    // Header
    howItWorks: "How it Works",
    features: "Features",
    trackComplaints: "Track Complaints",
    faq: "FAQ",
    mpLogin: "MP Login",
    fileComplaint: "File a Complaint",
    
    // Hero
    heroTitle: "Turn Constituency Chaos into Actionable Intelligence.",
    heroDesc: "LokSetu bridges the gap between citizens and representatives. Citizens file complaints directly, while the AI-powered MP Dashboard maps demand hotspots and prioritizes development works instantly.",
    openMpDashboard: "Open MP Dashboard",
    forCitizens: "For Citizens",
    forCitizensDesc: "Transparent complaint tracking and direct communication.",
    forMps: "For MPs",
    forMpsDesc: "AI-driven priority scoring and automated budget allocation.",
    resolvedText: "Ward 3 Issue Resolved",
    resolvedSubtext: "Water Supply Fixed • Just now",

    // How It Works
    howItWorksTitle: "Bridging the Gap",
    howItWorksDesc: "LokSetu simplifies civic engagement by creating a direct, automated pipeline between a citizen's smartphone and an MP's command center.",
    forCitizensLabel: "For Citizens",
    forMpsLabel: "For Representatives",
    
    cStep1Title: "Report in Seconds",
    cStep1Desc: "Snap a photo of a pothole, broken streetlight, or hazard. LokSetu automatically tags the GPS location.",
    cStep2Title: "AI Categorization",
    cStep2Desc: "Our NLP engine categorizes the issue (even if reported in regional languages) and assigns an urgency score.",
    cStep3Title: "Track Progress",
    cStep3Desc: "Receive real-time updates when your MP reviews the issue, sanctions the budget, and when the work is completed.",
    
    mStep1Title: "Ingest & Analyze",
    mStep1Desc: "The dashboard ingests thousands of reports, using AI to filter noise, detect duplicates, and verify authenticity.",
    mStep2Title: "Density Mapping",
    mStep2Desc: "Visualize complaint hotspots. AI algorithms rank wards by urgency and population density, removing guesswork.",
    mStep3Title: "Allocate & Resolve",
    mStep3Desc: "Sanction development works directly from the dashboard. Funds are allocated, and citizens are automatically notified.",

    // Features
    featuresTitle: "Constituency OS Capabilities",
    featuresDesc: "Built for scale. LokSetu uses state-of-the-art AI to transform unstructured data into a precise administrative roadmap.",
    nlpTitle: "Multilingual NLP Extraction",
    nlpDesc: "Citizens can report issues in Hindi, Marathi, English, or any regional language. The NLP engine translates, extracts key entities, and categorizes the complaint automatically.",
    priorityTitle: "Dynamic Priority Scoring",
    priorityDesc: "Issues aren't just listed; they are ranked. The algorithm calculates priority based on urgency, affected population, and frequency.",
    fraudTitle: "Fraud & Duplicate Detection",
    fraudDesc: "Prevents budget drain by automatically flagging duplicate reports and verifying image EXIF data for authenticity.",
    heatmapTitle: "Geospatial Heatmaps",
    heatmapDesc: "Visualizing constituency health in real-time. MPs can see exactly where water shortages, power outages, or road damages are clustering, allowing for targeted resource deployment.",

    // Impact
    impactTitle: "The Real-World Impact",
    impactDesc: "LokSetu replaces bureaucratic black holes with transparent, AI-driven action. By automating duplicate detection and mapping complaints geospatially, we eliminate months of manual processing.",
    stat1Val: "10k+",
    stat1Label: "Complaints Auto-Categorized",
    stat2Val: "85%",
    stat2Label: "Reduction in Duplicates",
    withoutLoksetu: "Without LokSetu",
    withLoksetu: "With LokSetu",
    days120: "120+ Days",
    days14: "14 Days",

    // Testimonials
    testimonialsTitle: "Trusted by Both Sides",
    testimonialsDesc: "A platform only works if it serves the people using it. LokSetu delivers value to both the citizens who report issues and the officials who solve them.",
    mpQuote: "\"Before LokSetu, we had thousands of WhatsApp messages and paper forms. Now, the AI groups duplicate complaints and highlights critical hotspots on a map. We cleared a 6-month complaint backlog in two weeks.\"",
    mpAuthor: "Hon. Amit S.",
    mpRole: "Member of Parliament",
    citizenQuote: "\"I reported a massive pothole in our ward that had been ignored for months. I took a photo on the LokSetu app, and two days later I got a notification that the budget was sanctioned. The transparency is incredible.\"",
    citizenAuthor: "Priya M.",
    citizenRole: "Citizen, Ward 3",

    // FAQ
    faqTitle: "Technical Architecture & FAQ",
    faqDesc: "Common questions regarding the AI algorithms, verification processes, and system workflows.",
    q1: "How does the AI Priority Score work?",
    a1: "The platform calculates priority using a proprietary dynamic algorithm. It evaluates the inherent urgency of the issue (e.g., a broken water pipe is scored higher than cosmetic damage) and cross-references it against the population density of the affected ward. This ensures that life-threatening hazards are addressed immediately, while systemic issues are properly scaled so smaller wards aren't ignored.",
    q2: "How does the system handle fake or duplicate reports?",
    a2: "LokSetu employs a robust verification engine. It extracts EXIF data (time and GPS location) from uploaded photos to prevent fake submissions. The AI also cross-references new reports with the database, automatically grouping duplicate complaints from the same radius into a single 'High Volume' issue.",
    q3: "What if a citizen reports an issue in a regional language?",
    a3: "Our built-in Multilingual NLP engine automatically translates complaints submitted in Hindi, Marathi, or any other regional language into English for the central dashboard, while extracting the core entity (e.g., 'pothole', 'power outage').",
    q4: "Can citizens track the exact status of their specific complaint?",
    a4: "Yes. The Citizen Portal provides real-time notifications at three key stages: 1) Verified by AI, 2) Reviewed by MP / Budget Sanctioned, and 3) Resolved by Authorities.",

    // Footer
    tagline: "Bridging the gap between citizens and representatives with transparent, AI-powered constituency management.",
    platform: "Platform",
    systemStatus: "System Status",
    allSystemsNominal: "All Systems Operational",
    copyright: "© 2026 LokSetu. Empowering Indian constituencies.",

    // Login Screen
    aiCivicCopilot: "AI CIVIC COPILOT",
    citizenLeftHeadline: "Your direct bridge to smarter, faster civic action.",
    citizenLeftSubtitle: "Easily report local issues, track their progress in real-time, and hold leaders accountable. Let AI route your concerns directly to the right department.",
    liveComplaintTracking: "Live Complaint Tracking",
    resolutionEta: "Resolution ETA",
    twoDays: "2 Days",
    issueReported: "Issue Reported",
    sampleIssue: '"Potholes on MG Road causing severe traffic delays. Needs urgent repair."',
    aiAssistant: "AI Assistant",
    sampleResponse: "Your complaint has been verified and routed to the PWD department. I will notify you when work begins.",
    instantTracking: "Instant Tracking",
    voiceInteractive: "Voice Interactive",
    civicLeaderboard: "Civic Leaderboard",
    aiConstituencyPulse: "AI CONSTITUENCY PULSE",
    mpLeftHeadline: "Stay ahead of your constituency's most urgent needs.",
    mpLeftSubtitle: "Monitor real-time pulse reports from citizens. Instantly prioritize verified local issues using AI-driven severity scoring and smart routing, ensuring no voice goes unheard.",
    priorityAreaAnalysis: "Priority Area Analysis",
    urgencyLevel: "Urgency Level",
    ninetyEightPercent: "98%",
    sampleMpRow1: "Ward 14 Infrastructure — Critical Potholes & Drainage",
    sampleMpRow2: "✔ Auto-Routed to: PWD & Municipal Corp",
    sampleMpRow3: "AI Verified Priority Score: 95/100 (Immediate Action)",
    aiActionRecommendation: "AI Action Recommendation",
    dispatchTeam: "Dispatch Maintenance Team",
    grievanceAnalytics: "Grievance Analytics",
    publicSentiment: "Public Sentiment",
    criticalAlerts: "Critical Alerts",
    welcomeToLoksetu: "Welcome to LokSetu",
    citizenFormDesc: "Sign in to access your civic navigator.",
    mpFormDesc: "Sign in to access your constituency dashboard.",
    citizenTab: "Citizen",
    mpTab: "Member of Parliament",
    emailAddress: "Email address",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "Min 6 characters",
    continueBtn: "Continue",
    orText: "or",
    googleBtnText: "Sign in with Google",
    dontHaveAccount: "Don't have an account?",
    signUp: "Sign Up",
    backToHome: "Back to Home"
  },
  hi: {
    // Header
    howItWorks: "काम करने का तरीका",
    features: "विशेषताएं",
    trackComplaints: "शिकायतें ट्रैक करें",
    faq: "सामान्य प्रश्न",
    mpLogin: "सांसद लॉगिन",
    fileComplaint: "शिकायत दर्ज करें",
    
    // Hero
    heroTitle: "क्षेत्र की समस्याओं को ठोस प्रशासनिक समाधान में बदलें।",
    heroDesc: "लोकसेतु नागरिकों और जनप्रतिनिधियों के बीच की दूरी को मिटाता है। नागरिक अपनी शिकायतें सीधे दर्ज करते हैं, जबकि एआई-संचालित सांसद डैशबोर्ड गंभीर समस्याओं वाले संवेदनशील क्षेत्रों की पहचान करता है और विकास कार्यों को प्राथमिकता देता है।",
    openMpDashboard: "सांसद डैशबोर्ड खोलें",
    forCitizens: "नागरिकों के लिए",
    forCitizensDesc: "शिकायतों की पारदर्शी ट्रैकिंग और सीधा संपर्क।",
    forMps: "सांसदों के लिए",
    forMpsDesc: "एआई-संचालित प्राथमिकता स्कोरिंग और स्वचालित बजट आवंटन।",
    resolvedText: "वार्ड ३ की समस्या का समाधान",
    resolvedSubtext: "पानी की आपूर्ति ठीक की गई • अभी-अभी",
    
    // How It Works
    howItWorksTitle: "दूरी को कम करना",
    howItWorksDesc: "लोकसेतु नागरिक के स्मार्टफोन और सांसद के कार्यालय के बीच एक सीधा, स्वचालित डिजिटल चैनल बनाकर नागरिक भागीदारी को सरल बनाता है।",
    forCitizensLabel: "नागरिकों के लिए",
    forMpsLabel: "प्रतिनिधियों के लिए",
    
    cStep1Title: "सेकंडों में रिपोर्ट करें",
    cStep1Desc: "सड़क के गड्ढे, खराब स्ट्रीटलाइट या किसी खतरे की तस्वीर लें। लोकसेतु स्वतः ही जीपीएस लोकेशन दर्ज कर लेता है।",
    cStep2Title: "एआई द्वारा वर्गीकरण",
    cStep2Desc: "हमारा एआई इंजन शिकायत को वर्गीकृत करता है (भले ही वह क्षेत्रीय भाषा में हो) और उसकी तात्कालिकता निर्धारित करता है।",
    cStep3Title: "प्रगति ट्रैक करें",
    cStep3Desc: "जब सांसद आपकी शिकायत की समीक्षा करेंगे, बजट पास करेंगे और काम पूरा होगा, तो आपको तुरंत अपडेट मिलेगा।",
    
    mStep1Title: "प्राप्त करें और जांचें",
    mStep1Desc: "सांसद डैशबोर्ड हजारों रिपोर्ट प्राप्त करता है, एआई का उपयोग करके फालतू शिकायतों को हटाता है और सत्यता की जांच करता है।",
    mStep2Title: "सघनता मानचित्रण",
    mStep2Desc: "शिकायत के संवेदनशील क्षेत्रों को देखें। एआई एल्गोरिदम तात्कालिकता और जनसंख्या घनत्व के आधार पर प्राथमिकता तय करता है।",
    mStep3Title: "बजट और समाधान",
    mStep3Desc: "डैशबोर्ड से सीधे विकास कार्यों को मंजूरी दें। धनराशि आवंटित की जाती है और नागरिकों को स्वतः ही सूचित किया जाता है।",

    // Features
    featuresTitle: "निर्वाचन क्षेत्र संचालन प्रणाली की क्षमताएं",
    featuresDesc: "असीमित क्षमता। लोकसेतु नागरिक डेटा को एक सटीक प्रशासनिक कार्य योजना में बदलने के लिए आधुनिक एआई का उपयोग करता है।",
    nlpTitle: "बहुभाषी प्राकृतिक भाषा प्रसंस्करण (NLP)",
    nlpDesc: "नागरिक हिंदी, मराठी, अंग्रेजी या किसी भी क्षेत्रीय भाषा में रिपोर्ट दर्ज कर सकते हैं। एआई स्वतः अनुवाद कर शिकायत का वर्गीकरण करता है।",
    priorityTitle: "गतिशील प्राथमिकता स्कोरिंग",
    priorityDesc: "शिकायतों को केवल सूचीबद्ध नहीं किया जाता; उन्हें प्राथमिकता दी जाती है। एआई तात्कालिकता, प्रभावित आबादी और बार-बार होने के आधार पर रैंक तय करता है।",
    fraudTitle: "धोखाधड़ी और डुप्लिकेट का पता लगाना",
    fraudDesc: "डुप्लिकेट रिपोर्टों को स्वतः चिन्हित करके और तस्वीर के स्थान डेटा की जांच करके सरकारी बजट के दुरुपयोग को रोकता है।",
    heatmapTitle: "भौगोलिक हीटमैप (Heatmaps)",
    heatmapDesc: "वास्तविक समय में निर्वाचन क्षेत्र की स्थिति का विश्लेषण। सांसद देख सकते हैं कि पानी की कमी या सड़क खराबी कहाँ अधिक है, जिससे त्वरित समाधान हो सके।",

    // Impact
    impactTitle: "वास्तविक प्रभाव",
    impactDesc: "लोकसेतु लालफीताशाही की जगह पारदर्शी, त्वरित कार्रवाई लाता है। डुप्लिकेट का स्वतः पता लगाकर हम महीनों के कागजी काम को समाप्त करते हैं।",
    stat1Val: "१०,०००+",
    stat1Label: "स्वचालित रूप से वर्गीकृत शिकायतें",
    stat2Val: "८५%",
    stat2Label: "डुप्लिकेट शिकायतों में कमी",
    withoutLoksetu: "लोकसेतु के बिना",
    withLoksetu: "लोकसेतु के साथ",
    days120: "१२०+ दिन",
    days14: "१४ दिन",

    // Testimonials
    testimonialsTitle: "दोनों पक्षों का भरोसा",
    testimonialsDesc: "कोई भी मंच तभी सफल होता है जब वह लोगों की सेवा करे। लोकसेतु नागरिकों और अधिकारियों दोनों के लिए मूल्यवान परिणाम देता है।",
    mpQuote: "\"लोकसेतु से पहले, हमारे पास हजारों व्हाट्सएप संदेश और कागजी फॉर्म आते थे। अब, एआई समान शिकायतों को एक साथ समूहित करता है। हमने केवल दो सप्ताह में ६ महीने की लंबित शिकायतों का निपटारा कर दिया।\"",
    mpAuthor: "माननीय अमित एस.",
    mpRole: "संसद सदस्य (सांसद)",
    citizenQuote: "\"मैंने हमारे वार्ड में एक बहुत बड़े गड्ढे की शिकायत की थी जिसे महीनों से अनदेखा किया जा रहा था। मैंने लोकसेतु ऐप पर फोटो ली, और दो दिन बाद मुझे सूचित किया गया कि बजट स्वीकृत हो गया है। यह पारदर्शिता अद्भुत है।\"",
    citizenAuthor: "प्रिया एम.",
    citizenRole: "नागरिक, वार्ड ३",

    // FAQ
    faqTitle: "तकनीकी संरचना और अक्सर पूछे जाने वाले प्रश्न",
    faqDesc: "एआई एल्गोरिदम, सत्यापन प्रक्रियाओं और प्रणाली के संचालन के बारे में सामान्य प्रश्न।",
    q1: "एआई प्राथमिकता स्कोर कैसे काम करता है?",
    a1: "मंच एक विशिष्ट गतिशील एल्गोरिदम का उपयोग करके प्राथमिकता की गणना करता है। यह समस्या की तात्कालिकता (जैसे, टूटी पानी की पाइपलाइन को सामान्य सौंदर्य क्षति से अधिक प्राथमिकता मिलती है) और प्रभावित वार्ड के जनसंख्या घनत्व के आधार पर रैंक तय करता है।",
    q2: "फर्जी या डुप्लिकेट रिपोर्टों से प्रणाली कैसे निपटती है?",
    a2: "लोकसेतु फर्जी शिकायतों को रोकने के लिए अपलोड की गई तस्वीरों से समय और जीपीएस लोकेशन डेटा निकालता है। एआई नई रिपोर्टों की जांच करके समान शिकायतों को एक साथ जोड़ देता है।",
    q3: "यदि कोई नागरिक क्षेत्रीय भाषा में शिकायत दर्ज करता है तो क्या होगा?",
    a3: "हमारा एआई इंजन स्वचालित रूप से हिंदी, मराठी या किसी अन्य क्षेत्रीय भाषा में दर्ज शिकायतों का अनुवाद करता है, और मुख्य विषय (जैसे 'गड्ढा', 'बिजली कटौती') की पहचान करता है।",
    q4: "क्या नागरिक अपनी शिकायत की प्रगति को ट्रैक कर सकते हैं?",
    a4: "हाँ। नागरिक पोर्टल तीन मुख्य चरणों में वास्तविक समय अपडेट प्रदान करता है: १) एआई द्वारा सत्यापित, २) सांसद द्वारा स्वीकृत/बजट आवंटित, और ३) अधिकारियों द्वारा हल।",

    // Footer
    tagline: "पारदर्शी, एआई-संचालित क्षेत्र प्रबंधन के साथ नागरिकों और जनप्रतिनिधियों के बीच की दूरी को कम करना।",
    platform: "मंच",
    systemStatus: "प्रणाली की स्थिति",
    allSystemsNominal: "सभी प्रणालियाँ सुचारू रूप से चालू हैं",
    copyright: "© २०२६ लोकसेतु। भारतीय निर्वाचन क्षेत्रों का सशक्तिकरण।",

    // Login Screen
    aiCivicCopilot: "एआई नागरिक सह-पायलट",
    citizenLeftHeadline: "स्मार्ट और त्वरित नागरिक कार्रवाई के लिए आपका सीधा माध्यम।",
    citizenLeftSubtitle: "स्थानीय समस्याओं की आसानी से रिपोर्ट करें, वास्तविक समय में उनकी प्रगति को ट्रैक करें और अधिकारियों को जवाबदेह बनाएं। एआई को आपकी चिंताओं को सीधे सही विभाग में भेजने दें।",
    liveComplaintTracking: "शिकायतों की लाइव ट्रैकिंग",
    resolutionEta: "समाधान का अनुमानित समय",
    twoDays: "२ दिन",
    issueReported: "रिपोर्ट की गई समस्या",
    sampleIssue: '"एमजी रोड पर गड्ढों के कारण यातायात में भारी देरी हो रही है। तत्काल मरम्मत की आवश्यकता है।"',
    aiAssistant: "एआई सहायक",
    sampleResponse: "आपकी शिकायत सत्यापित कर पीडब्ल्यूडी विभाग को भेज दी गई है। काम शुरू होने पर मैं आपको सूचित करूँगा।",
    instantTracking: "त्वरित ट्रैकिंग",
    voiceInteractive: "आवाज संवादात्मक",
    civicLeaderboard: "नागरिक लीडरबोर्ड",
    aiConstituencyPulse: "एआई निर्वाचन क्षेत्र पल्स",
    mpLeftHeadline: "अपने निर्वाचन क्षेत्र की सबसे जरूरी समस्याओं से आगे रहें।",
    mpLeftSubtitle: "नागरिकों से वास्तविक समय की पल्स रिपोर्ट की निगरानी करें। एआई-संचालित गंभीरता स्कोरिंग और स्मार्ट राउटिंग का उपयोग करके तुरंत सत्यापित स्थानीय मुद्दों को प्राथमिकता दें, यह सुनिश्चित करते हुए कि कोई भी आवाज अनसुनी न रहे।",
    priorityAreaAnalysis: "प्राथमिकता क्षेत्र विश्लेषण",
    urgencyLevel: "तात्कालिकता का स्तर",
    ninetyEightPercent: "९८%",
    sampleMpRow1: "वार्ड १४ अवसंरचना — गंभीर गड्ढे और जल निकासी",
    sampleMpRow2: "✔ स्वतः प्रेषित: पीडब्ल्यूडी और नगर निगम",
    sampleMpRow3: "एआई सत्यापित प्राथमिकता स्कोर: ९५/१०० (तत्काल कार्रवाई)",
    aiActionRecommendation: "एआई कार्रवाई सिफारिश",
    dispatchTeam: "रखरखाव टीम भेजें",
    grievanceAnalytics: "शिकायत विश्लेषण",
    publicSentiment: "जनता की भावना",
    criticalAlerts: "गंभीर अलर्ट",
    welcomeToLoksetu: "लोकसेतु में आपका स्वागत है",
    citizenFormDesc: "अपने नागरिक नेविगेटर तक पहुंचने के लिए साइन इन करें।",
    mpFormDesc: "अपने निर्वाचन क्षेत्र के डैशबोर्ड तक पहुंचने के लिए साइन इन करें।",
    citizenTab: "नागरिक",
    mpTab: "संसद सदस्य (सांसद)",
    emailAddress: "ईमेल पता",
    emailPlaceholder: "you@example.com",
    password: "पासवर्ड",
    passwordPlaceholder: "कम से कम ६ अक्षर",
    continueBtn: "आगे बढ़ें",
    orText: "या",
    googleBtnText: "गूगल के साथ साइन इन करें",
    dontHaveAccount: "खाता नहीं है?",
    signUp: "साइन अप करें",
    backToHome: "होम पर वापस जाएं"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'hi' || savedLang === 'en') {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
