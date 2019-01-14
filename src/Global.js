var Global = {
    isOnline: false,
    checkingOnline: false,
    parseClassTable: false,
    cookie: "",
    loginInfo: {
        j_username: "",
        j_password: ""
    },
    outerCookie: "",
    currentStuName: "",
    startDate: "",
    termName: "",
    weekLength: "",
    defRes: {
        adcId: "",
        campus: "",
        department: "",
        personId: "",
        school: "",
        schType: "",
        teachingTerm: "",
        term_a: "",
        term_l: "",
        term_s: "",
        university: "",
        year: ""
    },
    defColor: [
        "#fdad8b",
        "#90daa3",
        "#93adea",
        "#6cc2e6",
        "#a0d462",
        "#ea98b5",
        "#7fc2ad",
        "#b6a4db",
        "#f6a1a1",
        "#93c6ea"
    ],
    tips: {},
    classJson: [],
    card: {
        isOnline: false,
        cookie: "",
        username: "",
        password: ""
    },
    showTips: true,
    settings: {
        outOfSchool: false,
        theme: {
            index: 0,
            color: "#ffffff",
            backgroundColor: "#2089dc",
            nightMode: false
        },
        class: {
            classLength: 11,
            navColor: "#808080",
            backgroundOpacity: 0,
            itemOpacity: 1,
            itemHeight: 70,
            fontSize: 14,
            backgroundImage: ""
        },
        options: {
            firstUseEval: true
        },
        weather: { city: "CN101060101", name: "长春" }
    }
};

export default Global;
