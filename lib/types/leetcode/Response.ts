// Leetcode返回的数据类型
export namespace LC {
  export interface ExampleGenerate {
    props: Props;
    page: string;
    query: ExampleGenerateQuery;
    buildId: string;
    assetPrefix: string;
    isFallback: boolean;
    gssp: boolean;
    scriptLoader: any[];
  }

  export interface Props {
    pageProps: PageProps;
    __N_SSP: boolean;
  }

  export interface PageProps {
    isRobotVisit: boolean;
    dehydratedState: DehydratedState;
    _nextI18Next: NextI18Next;
  }

  export interface NextI18Next {
    initialI18nStore: InitialI18NStore;
    initialLocale: string;
    ns: string[];
    userConfig: UserConfig;
  }

  export interface InitialI18NStore {
    zh: Zh;
  }

  export interface Zh {
    common: ZhCommon;
    problems: Problems;
    console: Console;
    'code-editor': CodeEditor;
    description: ZhDescription;
    submissions: Submissions;
    'feature-guide': FeatureGuide;
    'feature-guide-dynamic': FeatureGuideDynamic;
    solutions: Solutions;
    comments: Comments;
    'post-solution': PostSolution;
    'new-study-plan': NewStudyPlan;
    problemlist: Problemlist;
  }

  export interface CodeEditor {
    commonConfirmTitle: string;
    fullScreen: string;
    exitFullScreen: string;
    autocomplete: Autocomplete;
    langInfo: string;
    settings: CodeEditorSettings;
    shortcuts: CodeEditorShortcuts;
    reset: Reset;
    history: History;
    timer: Timer;
    debugger: Debugger;
    markDownPlaceholder: string;
    retrieveCode: RetrieveCode;
    'editor-position': string;
    framework: Framework;
    saveCode: SaveCode;
    format: Format;
    exceedMaxLineLength: string;
  }

  export interface Autocomplete {
    button: string;
    lspTooltip: string;
    basicTooltip: string;
    basicWithLspError: string;
    lspConnectionError: string;
    lspNotSupportedTooltip: string;
    needToLoginTooltip: string;
    notPremiumTooltip: string;
  }

  export interface Debugger {
    loginToDebug: string;
    name: string;
    stdout: string;
    input: string;
    enterTip: string;
    exit: string;
    start: string;
    stop: string;
    startShort: string;
    stopShort: string;
    watch: string;
    local: string;
    watchHolder: string;
    controlStart: string;
    controlForward: string;
    controlStepOver: string;
    controlStepOut: string;
    controlStepIn: string;
    controlReset: string;
    exited: string;
    startToWatch: string;
    watchTip: string;
    startViewVars: string;
    noVars: string;
    startViewOutput: string;
    noOutput: string;
    edited: string;
    cantAddTestcase: string;
    langNotSupported: string;
    expressionsNotSupported: string;
    notPremium: string;
    oneClickDebug: string;
  }

  export interface Format {
    tip: string;
    formatted: string;
  }

  export interface Framework {
    switchTooltip: string;
    modalTitle: string;
    modalDescription: string;
    modalConfirmTitle: string;
    modalConfirmText: string;
    modalConfirmBtn: string;
    toastSwitchSuccess: string;
    guide: Guide;
  }

  export interface Guide {
    selectFramework: string;
    selectFrameworkDescription: string;
    selectFrameworkConfirm: string;
  }

  export interface History {
    title: string;
    tip: string;
    description: string;
    status: string;
    runtime: string;
    memory: string;
    time: string;
    topic: string;
    notes: string;
    noNotes: string;
  }

  export interface Reset {
    tip: string;
    confirmContent: string;
    resetServer: string;
    restore: string;
  }

  export interface RetrieveCode {
    tip: string;
    confirmContent: string;
    noData: string;
  }

  export interface SaveCode {
    restoredFromCloud: string;
    restoredFromLocal: string;
    upgradeToCloud: string;
    savedToCloudToast: string;
    savedToLocalToastFirst: string;
    savedToLocalToastSecond: string;
    upgradeToPremium: string;
    savedToCloud: string;
    savedToLocal: string;
    saving: string;
  }

  export interface CodeEditorSettings {
    name: string;
    fontSize: string;
    fontSizeDesc: string;
    theme: string;
    themeDesc: string;
    themeDark: string;
    themeLight: string;
    themeSystem: string;
    keyBinding: string;
    keyBindingDesc: string;
    keyBindingVim: string;
    keyBindingEmacs: string;
    keyBindingStandard: string;
    tabSize: string;
    tabSizeDesc: string;
    spaces: string;
    wordWrap: string;
  }

  export interface CodeEditorShortcuts {
    name: string;
    run: string;
    submit: string;
    debug: string;
    indent: string;
    indentFew: string;
    moveLines: string;
    cut: string;
    toggleComment: string;
    undo: string;
    redo: string;
    note: string;
  }

  export interface Timer {
    start: string;
    hide: string;
    show: string;
    reset: string;
    pause: string;
    continue: string;
    contest: TimerContest;
  }

  export interface TimerContest {
    penaltyTimeDescription: string;
  }

  export interface Comments {
    edited: string;
    tooShort: string;
    noComments: string;
    reply: string;
    mentionInputPlaceholder: string;
    user: string;
    problem: string;
    mdRules: MdRules;
    pinnedBy: string;
    share: string;
    edit: string;
    shareCopySuccess: string;
    hideReplies: string;
    showReplies: string;
    cancel: string;
    confirm: string;
    preview: string;
    comment: string;
    typeCommentHere: string;
    comments: string;
    sortBy: string;
    newestToOldest: string;
    oldestToNewest: string;
    mostVotes: string;
    best: string;
    editor: string;
    youMust: string;
    verifyYourEmail: string;
    first: string;
    readMore: string;
    somethingWentWrong: string;
    areYouSure: string;
    confirmDeleteComment: string;
    confirmRestoreComment: string;
    confirmHideComment: string;
    confirmShowComment: string;
    confirmPinComment: string;
    confirmUnpinComment: string;
    reward: string;
    delete: string;
    hide: string;
    show: string;
    askQuestion: string;
    feedback: string;
    tips: string;
    chooseAType: string;
    showMoreReplies: string;
    hideSuccess: string;
    showSuccess: string;
    pinSuccess: string;
    unpinSuccess: string;
    deleteSuccess: string;
    restore: string;
    restoreSuccess: string;
    hidden: string;
    report: string;
    pin: string;
    pinned: string;
    unpin: string;
    hideComment: string;
    showComment: string;
    move: string;
    moveTitle: string;
    moveTitlePlaceholder: string;
    moveSuccess: string;
    postSuccess: string;
    genericError: string;
    signInVoteError: string;
    verifyVoteError: string;
  }

  export interface MdRules {
    inlineCode: string;
    codeBlock: string;
    link: string;
    href: string;
  }

  export interface ZhCommon {
    '404': The404;
    meta: CommonMeta;
    ok: string;
    cancel: string;
    confirm: string;
    update: string;
    submit: string;
    save: string;
    netFailed: string;
    header: Header;
    conjunctions: Conjunctions;
    pages: Pages;
    userMenu: UserMenu;
    streakCounter: StreakCounter;
    playground: Playground;
    links: Links;
    pagination: Pagination;
    expand: string;
    collapse: string;
    difficulty: Difficulty;
    data: CommonData;
    markdown: Markdown;
    mentions: Mentions;
    confirmModal: ConfirmModal;
    saving: string;
    saved: string;
    autoSaved: string;
    loginRequired: string;
    verifiedRequired: string;
    phoneVerifiedRequired: string;
    maybeVerifiedRequired: string;
    copy: string;
    copyToEditor: string;
    copied: string;
    copyLink: string;
    viewMore: string;
    viewLess: string;
    code: string;
    dailyCheckIn: string;
    '//maybeVerifiedRequired': string;
    easterEgg: EasterEgg;
    survey: CommonSurvey;
    qdNav: QdNav;
    premiumModal: PremiumModal;
    truncatedContent: TruncatedContent;
    safariNotUse: string;
    medal: Medal;
  }

  export interface The404 {
    title: string;
    pageNotFound: string;
    message: string;
  }

  export interface ConfirmModal {
    title: string;
    confirmBtn: string;
    cancelBtn: string;
  }

  export interface Conjunctions {
    and: string;
    or: string;
  }

  export interface CommonData {
    question: PurpleQuestion;
  }

  export interface PurpleQuestion {
    difficulty: Difficulty;
  }

  export interface Difficulty {
    easy: string;
    medium: string;
    hard: string;
  }

  export interface EasterEgg {
    rewardMessage: string;
  }

  export interface Header {
    logo: Logo;
    title: Title;
    action: Action;
  }

  export interface Action {
    login: Login;
  }

  export interface Login {
    text: string;
    url: string;
  }

  export interface Logo {
    url: string;
    description: string;
  }

  export interface Title {
    'problemset-all': string;
  }

  export interface Links {
    admin: LinksAdmin;
    premium: string;
    discuss: string;
    interview: string;
    shop: string;
    onlineInterview: string;
    profileArticles: string;
    tryNewFeatures: string;
    orders: string;
    explore: string;
    resume: string;
    playground: string;
    assessment: string;
    account: string;
  }

  export interface LinksAdmin {
    scores: string;
    translation: string;
    operations: string;
  }

  export interface Markdown {
    heading: string;
    quote: string;
  }

  export interface Medal {
    metadataTitle: string;
    congratulation: string;
    genPoster: string;
    genPostering: string;
    saveImgMobile: string;
    saveImgPc: string;
    medalEmpty: string;
  }

  export interface Mentions {
    users: string;
    problems: string;
  }

  export interface CommonMeta {
    title: string;
    description: string;
    keywords: string;
  }

  export interface Pages {
    leetcode: string;
    explore: string;
    problems: string;
    interview: Interview;
    contest: string;
    discuss: string;
    store: Store;
    admin: PagesAdmin;
    mobileApp: string;
    playground: string;
    myPlayground: string;
    signIn: string;
    register: string;
    signOut: string;
  }

  export interface PagesAdmin {
    admin: string;
    library: string;
    translation: string;
    operations: string;
    scores: string;
    contribute: string;
    backend: string;
    twoStepVerification: string;
    internalContest: string;
    contestAdmin: string;
    dangerZone: string;
    review: string;
    contestDashboard: string;
  }

  export interface Interview {
    interview: string;
    onlineInterview: string;
    assessment: string;
  }

  export interface Store {
    store: string;
    redeem: string;
    premium: string;
    shop: string;
  }

  export interface Pagination {
    perpage: string;
  }

  export interface Playground {
    playground: string;
    remainingPlaygrounds: string;
    renew: string;
    myPlaygrounds: string;
    templates: Templates;
  }

  export interface Templates {
    consoleApplication: string;
    empty: string;
    frontend: string;
    machineLearning: string;
  }

  export interface PremiumModal {
    learnMore: string;
    subscribe: string;
  }

  export interface QdNav {
    backTitle: string;
    expandPanel: string;
    preQuestion: string;
    nextQuestion: string;
    pickOne: string;
    openInNewTab: string;
  }

  export interface StreakCounter {
    finished: string;
    unfinished: string;
    buyTimeTravelTicket: string;
    missedOneDayThisMonth: string;
    missedDaysThisMonth: string;
  }

  export interface CommonSurvey {
    veryDissatisfied: string;
    verySatisfied: string;
    next: string;
    continue: string;
    submit: string;
    questionNo: string;
    thanksMsg: string;
  }

  export interface TruncatedContent {
    viewAll: string;
    viewLess: string;
    openRaw: string;
    showMore: string;
    showLess: string;
  }

  export interface UserMenu {
    renew: string;
    getPremium: string;
    tryNewFeatures: string;
    orders: string;
    resume: string;
    translateQuestions: string;
    translateQuestionsEn: string;
    enterprise: string;
    revertToOldVersion: string;
    categories: Categories;
    unmockUser: string;
    account: string;
    appearance: string;
    appearanceContent: AppearanceContent;
  }

  export interface AppearanceContent {
    auto: string;
    light: string;
    dark: string;
  }

  export interface Categories {
    myList: string;
    notebook: string;
    submissions: string;
    session: string;
    points: string;
    progress: string;
  }

  export interface Console {
    meta: MetadataClass;
    console: string;
    run: string;
    submit: string;
    resetTestcases: string;
    debug: string;
    testcase: string;
    debugger: string;
    testcaseNumber: string;
    cloneCurrentTestcase: string;
    testcaseCount: string;
    switchToRawEditor: string;
    switchToTabEditor: string;
    switchConsoleToLeft: string;
    switchConsoleToRight: string;
    testcasePlaceholder: string;
    shellTestcaseBlocker: string;
    sourceMode: string;
    sourceModeText: string;
    noThanks: string;
    tryNow: string;
    inconsistentResults: string;
    inconsistentResultsContent: string;
    gotIt: string;
    readMore: string;
    result: Result;
    ai: AI;
    info: Info;
    execute: string;
    to: string;
    fullTreeTooBig: string;
    or: string;
    showFullTree: string;
    visualizer: Visualizer;
    verifyEmail: string;
    signToRunOrSubmit: string;
    signToRunAndSubmit: string;
    verifyToRunAndSubmit: string;
    notAvailableDuringDebugging: string;
    notAvailableDuringExecuting: string;
    nonVerifyMsg: string;
    frontendTestcases: FrontendTestcases;
  }

  export interface AI {
    title: string;
    beta: string;
    analyzingCode: string;
    codeErrorHint: string;
    fullName: string;
    shortName: string;
    description: string;
    fixedError: string;
    morePremiumFeatures: string;
  }

  export interface FrontendTestcases {
    reset: string;
    lnCol: string;
    guideTooltip: string;
    guideTitle: string;
  }

  export interface Info {
    info: string;
    content: string;
    ok: string;
    howToCreateBinaryTreeTestcases: string;
    howToCreateDatabaseTestcases: string;
  }

  export interface MetadataClass {
    title: string;
  }

  export interface Result {
    result: string;
    stdout: string;
    noResult: string;
    notAvailable: string;
    slowdown: Slowdown;
    networkError: string;
    serverError: string;
    unknownError: string;
    compileError: string;
    runtimeError: string;
    copyCompileError: string;
    copied: string;
    viewAll: string;
    viewLess: string;
    outputLimitExceeded: string;
    timeLimitExceeded: string;
    memoryLimitExceeded: string;
    timeout: string;
    internalError: string;
    accepted: string;
    finished: string;
    wrongAnswer: string;
    invalidTestcase: string;
    runtime: string;
    input: string;
    output: string;
    expected: string;
    contribution: string;
    pending: string;
    premiumPending: string;
    judging: string;
    debugging: string;
    speedUp: string;
    lastExecutedInput: string;
    openTestcase: string;
    testcasesPassed: string;
    testPassedButTookTooLong: string;
    useTestcaseAsInput: string;
    addedTestcaseMessage: string;
    testcaseExistsMessage: string;
    cantUseTestcaseAsInput: string;
    maxTestcaseCountReached: string;
    debugger: string;
    copyContent: string;
    moreLine_one: string;
    moreLine_other: string;
    edit: string;
  }

  export interface Slowdown {
    premium: string;
    first: string;
    second: string;
    third: string;
  }

  export interface Visualizer {
    dataTooLarge: string;
    parseFailed: string;
    dataNotSupported: string;
    outputDataTypeNotSupported: string;
    initFailed: string;
  }

  export interface ZhDescription {
    status: StatusClass;
    somethingWentWrong: string;
    thanksForVoting: string;
    topics: string;
    companies: string;
    pastSixMonths: string;
    pastYear: string;
    pastTwoYears: string;
    hint: string;
    showHints: string;
    moreActions: string;
    feedback: string;
    showEnglish: string;
    showChinese: string;
    feedbackForm: FeedbackForm;
    accepted: string;
    submissions: string;
    acRate: string;
    copyright: string;
    yes: string;
    no: string;
    add2: string;
    seenBefore: string;
    whichCompany: string;
    whichPosition: string;
    whichTimePeriod: string;
    whichStage: string;
    thanksForFeedback: string;
    relatedTopics: string;
    add: string;
    remove: string;
    createNewList: string;
    nameListPlaceholder: string;
    cancel: string;
    save: string;
    setAsPrivate: string;
    addToList: string;
    sqlSchema: string;
    pandasSchema: string;
    confirm: string;
    favoriteSignInError: string;
    changeLanguageError: string;
    feedbackSignInError: string;
    likeSignInError: string;
    schemaCopySuccess: string;
    shareQuestionDescription: string;
    viewMyLists: string;
    searchPlaceholder: string;
    ok: string;
    addToListError: string;
    similarQuestions: string;
    discussion: string;
    myLists: string;
    create: string;
    addProblemToListSuccess: string;
    addedSuccess: string;
    removeProblemFromListSuccess: string;
    viewAllLists: string;
    unGetListInfo: string;
    listUnExist: string;
    listContextNull: string;
    listContextEmpty: string;
  }

  export interface FeedbackForm {
    title: string;
    alternative: string;
    cancel: string;
    submit: string;
    issuesEncountered: string;
    problem: string;
    somethingWentWrong: string;
    additionalFeedback: string;
    description: string;
    options: Options;
    optionRequiredError: string;
  }

  export interface Options {
    unclearDescription: string;
    unclearDifficulty: string;
    unclearTestCases: string;
    runtimeStrict: string;
    edgeCases: string;
    other: string;
    otherPlaceholder: string;
  }

  export interface StatusClass {
    tried: string;
    ac: string;
  }

  export interface FeatureGuide {
    layout: string;
    timer: string;
    debugger: string;
    problemSwitch: string;
    problemList: string;
    discussion: string;
    solution: string;
    back: string;
    skip: string;
    next: string;
    ok: string;
    title: string;
  }

  export interface FeatureGuideDynamic {
    back: string;
    skip: string;
    next: string;
    explore: string;
    step1: Step;
    step2: Step;
    step3: Step;
    step4: Step;
    step5: Step;
  }

  export interface Step {
    title: string;
    des: string;
    tip: string;
  }

  export interface NewStudyPlan {
    detail: Detail;
    list: List;
    myStudyPlan: MyStudyPlan;
    common: NewStudyPlanCommon;
    survey: NewStudyPlanSurvey;
    satisfactionSurvey: SatisfactionSurvey;
  }

  export interface NewStudyPlanCommon {
    studyPlan: string;
    tryNow: string;
    noTanks: string;
    newPlan: string;
    newPlanDesc: string;
    seeAll: string;
    totalProgress: string;
    totalScore: string;
    progress: string;
    completed: string;
    giveUp: string;
    ongoing: string;
    ongoingStudyPlan: string;
    later: string;
    joinInQDTitle: string;
    joinInQD: string;
    doNotRemind: string;
    exploreButton: string;
    notFoundText: string;
  }

  export interface Detail {
    metadata: DetailMetadata;
    weekTextAbbr: WeekText;
    weekText: WeekText;
    myPlan: string;
    problemLeft: string;
    problemsLeft: string;
    notification: string;
    setUpSp: string;
    solvedText: string;
    problem: string;
    problems: string;
    learnMore: string;
    you: string;
    weeklyRanking: string;
    weeklyRankingToolTip: string;
    solvePrev: string;
    solveNext: string;
    startTitle: string;
    confirmStartText: string;
    quitTypeTipPrev: string;
    quitTypeTipNext: string;
    subscribeToUnlock: string;
    subscribeToUnlockContent: string;
    start: string;
    share: string;
    backToExplore: string;
    goCurrentPage: string;
    premiumTip: string;
    copyLink: string;
    copiedSuccess: string;
    more: string;
    quit: string;
    back: string;
    quitTitle: string;
    quitContent: string;
    showTags: string;
    summary: string;
    showMore: string;
    showLess: string;
    award: string;
    awardCongratulation: string;
    related: string;
    viewMore: string;
    todo: string;
    attempted: string;
    solved: string;
    markAsSolved: string;
    markAsSolvedTip: string;
    difficulty: string;
    congratulation: string;
    solvedAllProblemsText: string;
    checkBadge: string;
    profilePage: string;
    wearGlory: string;
    checkMyStudyPlan: string;
    joinSuccessfully: string;
    quitSuccessfully: string;
    setSuccessfully: string;
    errorTip: string;
    quitTip: string;
    pastSolved: string;
    solution: string;
    points: string;
    ranking: string;
  }

  export interface DetailMetadata {
    title: string;
    description: string;
    notFound: string;
  }

  export interface WeekText {
    sun: string;
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
  }

  export interface List {
    metadata: MetadataClass;
    title: string;
    ongoing: string;
    myPlan: string;
    featured: string;
    showMore: string;
    revertOldPlan: string;
    revertOldPlanTipTitle: string;
    revertOldPlanTipDesc: string;
    cancel: string;
    iSee: string;
  }

  export interface MyStudyPlan {
    metadata: MyStudyPlanMetadata;
    title: string;
    ongoing: string;
    history: string;
    noOngoingPlan: string;
    noHistoryPlan: string;
  }

  export interface MyStudyPlanMetadata {
    title: string;
    desc: string;
  }

  export interface SatisfactionSurvey {
    submitBtnText: string;
  }

  export interface NewStudyPlanSurvey {
    submit: string;
  }

  export interface PostSolution {
    meta: PostSolutionMeta;
    filterTopic: string;
    publishSolution: string;
    publishSolutionTooltip: string;
    restore: string;
    discard: string;
    discardConfirmTitle: string;
    discardConfirmContent: string;
    discardConfirmOk: string;
    discardConfirmCancel: string;
    guide: string;
    check: string;
    blockCode: string;
    tag: string;
    related: string;
    selectATag: string;
    post: string;
    publishError: string;
    imgUploadSuccuss: string;
    imgUploadError: string;
    guideTooltip: string;
    saved: string;
  }

  export interface PostSolutionMeta {
    newTitle: string;
    editTitle: string;
  }

  export interface Problemlist {
    metadata: ProblemlistMetadata;
    tags: string;
    todo: string;
    attempted: string;
    solved: string;
    move: string;
    removeFromList: string;
    addToList: string;
    moveToTop: string;
    moveToBottom: string;
    nullList: string;
    privateList: string;
    noQuestions: string;
    goToProblemSet: string;
    difficulty: Difficulty;
    'nav-panel': NavPanel;
    description: ProblemlistDescription;
  }

  export interface ProblemlistDescription {
    cover: Cover;
    operations: Operations;
    progress: Progress;
  }

  export interface Cover {
    editCover: string;
    emojis: string;
    image: string;
    random: string;
    background: string;
    chooseBackground: string;
    Recommend: string;
    'Smileys & Emotion': string;
    'People & Body': string;
    'Animals & Nature': string;
    'Food & Drink': string;
    Activities: string;
    'Travel & Places': string;
    Objects: string;
    Symbols: string;
    Flags: string;
    uploadImage: string;
    uploadRecommendedSize: string;
    uploadSizeLimit: string;
    cancel: string;
    save: string;
  }

  export interface Operations {
    questions: string;
    public: string;
    private: string;
    publicToast: string;
    privateToast: string;
    practice: string;
    listSave: string;
    listSaved: string;
    listSavedToast: string;
    listUnsavedToast: string;
    share: string;
    fork: string;
    forkToast: string;
    more: string;
    delete: string;
    deleteList: string;
    deleteAlert: string;
    cancel: string;
    acceptDelete: string;
    deleteToast: string;
    edit: string;
    editListInfo: string;
    title: string;
    description: string;
    descriptionPlaceholder: string;
    save: string;
    infoSavedToast: string;
    clickToReadMore: string;
    nonLoggedInDialog: NonLoggedInDialog;
  }

  export interface NonLoggedInDialog {
    saveTitle: string;
    saveContent: string;
    forkTitle: string;
    forkContent: string;
    notNow: string;
    logIn: string;
  }

  export interface Progress {
    progress: string;
    resetProgress: string;
    resetAlert: string;
    cancel: string;
    reset: string;
    resetToast: string;
    easy: string;
    medium: string;
    hard: string;
    solved: string;
    acceptance: string;
    beats: string;
    attempting: string;
  }

  export interface ProblemlistMetadata {
    defaultTitle: string;
    title: string;
  }

  export interface NavPanel {
    title: string;
    fold: string;
    unfold: string;
    createdByMe: string;
    savedByMe: string;
    public: string;
    private: string;
    remove: string;
    listInvalid: string;
  }

  export interface Problems {
    meta: ProblemsMeta;
    tabs: Tabs;
    feedback: Feedback;
    lockedQuestion: LockedQuestion;
    unsupportedFeature: UnsupportedFeature;
    satisfactionSurvey: SatisfactionSurvey;
    panel: Panel;
    dynamicLayout: DynamicLayout;
    settings: ProblemsSettings;
    preview: Preview;
    previewConsole: PreviewConsole;
    ideGuide: IDEGuide;
    contest: ProblemsContest;
  }

  export interface ProblemsContest {
    toolbar: Toolbar;
    navbar: Navbar;
  }

  export interface Navbar {
    classicMode: string;
  }

  export interface Toolbar {
    userAccepted: string;
    userAcceptedShort: string;
    userTried: string;
    userTriedShort: string;
    totalAccepted: string;
    totalAcceptedShort: string;
    totalSubmissions: string;
    totalSubmissionsShort: string;
  }

  export interface DynamicLayout {
    maximize: string;
    exit: string;
    foldPanel: string;
    unFoldPanel: string;
    moveTabset: string;
    disabledUnFold: string;
    layoutManager: LayoutManager;
    featureModal: FeatureModal;
    settingRunSubmitPopover: SettingRunSubmitPopover;
  }

  export interface FeatureModal {
    dynamicLayout: string;
    title: string;
    content: string;
    tryOut: string;
  }

  export interface LayoutManager {
    hints: string;
    layouts: string;
    featureTitle: string;
    featureContent: string;
    gotIt: string;
    tryNow: string;
    featureInfo: string;
    default: string;
    note: string;
    debug: string;
    saveCurrentLayout: string;
    saveNewLayout: string;
    nameYourLayout: string;
    temporaryTabs: string;
    temporaryTabsWarningBefore: string;
    temporaryTabsWarningAfter: string;
    temporaryTabsContent: string;
    cancel: string;
    save: string;
    layoutSaved: string;
    layoutDeleted: string;
    upgradeToSaveFirst: string;
    upgradeToSaveSecond: string;
    subscribe: string;
    apply: string;
    upgradeToApply: string;
    delete: string;
    deleteTitle: string;
    deleteContent: string;
    no: string;
    edit: string;
    editLayout: string;
    updateToCurrentLayout: string;
  }

  export interface SettingRunSubmitPopover {
    title: string;
    content: string;
    buttonText: string;
  }

  export interface Feedback {
    feedback: string;
    revertToOld: string;
  }

  export interface IDEGuide {
    introIdeTitle: string;
    new: string;
    introInfo: string;
    setTitle: string;
    setTip: string;
    enableIde: string;
    of: string;
    skipTour: string;
    back: string;
    next: string;
    done: string;
    toolbarTitle: string;
    toolbarContent: string;
    tabsTitle: string;
    tabsContent: string;
    resizeTitle: string;
    resizeContent: string;
    maximizeTitle: string;
    maximizeContent: string;
    expandCollapseTitle: string;
    expandCollapseContent: string;
    settingsTitle: string;
    settingsContent: string;
    maybeLater: string;
  }

  export interface LockedQuestion {
    subscribe: string;
    subscribeToUnlockMessage: string;
    subscribeToUnlock: string;
  }

  export interface ProblemsMeta {
    title: string;
    description: string;
    ogImage: string;
    defaultDescription: string;
  }

  export interface Panel {
    recommend: string;
    description: string;
  }

  export interface Preview {
    goBackTooltip: string;
    goForwardTooltip: string;
    refreshTooltip: string;
    openInNewTabTooltip: string;
    upgradeToGetUrl: string;
  }

  export interface PreviewConsole {
    isEmpty: string;
    clearTooltip: string;
    clearedAt: string;
  }

  export interface ProblemsSettings {
    settings: string;
    lab: string;
    premium: string;
    layout: Layout;
    editor: Editor;
    shortcuts: SettingsShortcuts;
    advanced: Advanced;
  }

  export interface Advanced {
    categoryTitle: string;
    premiumTitle: string;
    premiumDesc: string;
    learnMore: string;
    realTimeResizing: string;
    realTimeResizingDesc: string;
    multipleTab: string;
    multipleTabDesc: string;
    openAfterActive: string;
    openAfterSimilar: string;
    customLayout: string;
    customLayoutDesc: string;
    upgrade: string;
    view: string;
    multipleTabUpdateAlert: MultipleTabUpdateAlert;
  }

  export interface MultipleTabUpdateAlert {
    title: string;
    desc: string;
    no: string;
    update: string;
  }

  export interface Editor {
    categoryTitle: string;
    fontSize: string;
    keyBinding: string;
    keyBindingVim: string;
    keyBindingEmacs: string;
    keyBindingStandard: string;
    tabSize: string;
    spaces: string;
    wordWrap: string;
    relativeLineNumber: string;
  }

  export interface Layout {
    categoryTitle: string;
    resetToDefaultLayout: string;
    reset: string;
    runSubmitPosition: string;
    toolbar: string;
    'code-editor': string;
    revertToSplitViewMode: string;
  }

  export interface SettingsShortcuts {
    categoryTitle: string;
    or: string;
    general: string;
    runCode: string;
    submit: string;
    closeTab: string;
    maximizePanel: string;
    fullScreen: string;
    debug: string;
    debugStart: string;
    debugStop: string;
    debugSkipForward: string;
    debugStepOver: string;
    debugStepIn: string;
    debugStepOut: string;
    debugRestart: string;
    codeEditor: string;
    editorIndent: string;
    editorIndentFew: string;
    editorMoveLines: string;
    editorCut: string;
    editorToggleComment: string;
    editorUndo: string;
    editorRedo: string;
  }

  export interface Tabs {
    description: string;
    editorial: string;
    discussion: string;
    solutions: string;
    submissions: string;
    submissionOverview: string;
    code: string;
    testcase: string;
    result: string;
    debugger: string;
    settings: string;
    note: string;
    guide: string;
    preview: string;
    previewConsole: string;
    rawText: string;
    resultDiff: string;
    disabledTooltips: DisabledTooltips;
  }

  export interface DisabledTooltips {
    editorial: string;
  }

  export interface UnsupportedFeature {
    upgradeToIdeTitle: string;
    signInToTryOut: string;
    tryOut: string;
    features: Features;
  }

  export interface Features {
    frontendQuestion: string;
  }

  export interface Solutions {
    filter: Filter;
    solution: string;
    writeSolution: string;
    continueSolution: string;
    tags: SolutionsTags;
    post: Post;
    searchResult: SearchResult;
    noDirectResultsHint: string;
    noResults: string;
    noMoreResults: string;
    backToTop: string;
    report: Report;
    blocker: Blocker;
    videoSolutionTooltip: string;
    premiumOnlyTooltip: string;
    switchToRightTooltip: string;
    switchToLeftTooltip: string;
    switchFirstTimePopoverContent: string;
    switchFirstTimePopoverBtn: string;
    shareSolutionBanner: ShareSolutionBanner;
    sideBySide: SideBySide;
  }

  export interface Blocker {
    subscribeToUnlock: string;
    subscribeSubTitle: string;
    subscribe: string;
  }

  export interface Filter {
    searchPlaceholder: string;
    tags: FilterTags;
    sortBy: SortBy;
  }

  export interface SortBy {
    placeholder: string;
    hot: string;
    most_posts: string;
    most_relevant: string;
    most_votes: string;
    newest_to_oldest: string;
    oldest_to_newest: string;
    recent_activity: string;
    recent_activity_short: string;
    hot_short: string;
    newest_to_oldest_short: string;
    oldest_to_newest_short: string;
    most_votes_short: string;
    most_relevant_short: string;
  }

  export interface FilterTags {
    all: string;
    mySolution: string;
  }

  export interface Post {
    invalidSolutionTitle: string;
    invalidSolutionDescription: string;
    prevLabel: string;
    nextLabel: string;
    isAdmin: string;
    reputationTooltip: string;
    share: string;
    addToCollection: string;
    isInCollection: string;
    votes: string;
    shareCopySuccess: string;
    addToFavoriteSuccess: string;
    removeFromFavoriteSuccess: string;
    feedbackTooltip: string;
    backToTop: string;
    genericError: string;
    upvote: string;
    comments: string;
    allSolutions: string;
    more: { [key: string]: string };
    rateSuccess: string;
  }

  export interface Report {
    reportModalTitle: string;
    contentPlaceholder: string;
    cancel: string;
    confirm: string;
    advertising: string;
    sexual: string;
    violent: string;
    terrorism: string;
    illegal: string;
    politics: string;
    abuse: string;
    fake: string;
    nonEnglish: string;
    other: string;
    reportSuccess: string;
    reportError: string;
  }

  export interface SearchResult {
    commentPrefix: string;
    replyPrefix: string;
    colon: string;
  }

  export interface ShareSolutionBanner {
    lastSubmissionBeats: string;
    lastSubmissionBeatsSmall: string;
    lastSubmissionMemoryBeats: string;
    lastSubmissionMemoryBeatsSmall: string;
    signInAndShareSolutions: string;
    signIn: string;
    shareMySolution: string;
    share: string;
    getACSubmissionsToPublish: string;
  }

  export interface SideBySide {
    enterMode: string;
    exitMode: string;
    modeOn: string;
    modeOff: string;
    enterGuideTitle: string;
    enterGuideDesc: string;
    exitGuideTitle: string;
    exitGuideDesc: string;
    goToSettings: string;
    gotIt: string;
  }

  export interface SolutionsTags {
    official: string;
    pinned: string;
    favorite: string;
    mySolution: string;
    hidden: string;
  }

  export interface Submissions {
    runtime: string;
    memory: string;
    beat: string;
    noData: string;
    noSubmission: string;
    copied: string;
    submittedAt: string;
    allSubmissions: string;
    fullCode: string;
    success: Success;
    details: Details;
    buttons: Buttons;
    filters: Filters;
    notes: Notes;
    relatedTags: RelatedTags;
    chart: Chart;
    nonSignedIn: NonSignedIn;
    noCode: string;
    pending: string;
    testPassedButTookTooLong: string;
    failedSubmission: FailedSubmission;
    submissionPreview: SubmissionPreview;
    complexity: Complexity;
  }

  export interface Buttons {
    close: string;
    details: string;
    solution: string;
  }

  export interface Chart {
    runtimeDescription: string;
    memoryDescription: string;
    youAreHere: string;
    hintForAction: string;
    runtime: string;
    memory: string;
    percentLabel: string;
    runtimeValueLabel: string;
    memoryValueLabel: string;
    noData: string;
    memoryShortDescription: string;
    runtimeShortDescription: string;
    codeSample: string;
    runtimeCodeSampleInfo: string;
    memoryCodeSampleInfo: string;
    resetZoom: string;
    complexity: string;
  }

  export interface Complexity {
    timeComplexity: string;
    spaceComplexity: string;
    analyzeComplexity: string;
    accurate: string;
    notAccurate: string;
    notAccurateTitle: string;
    placeholder: string;
    premiumLimit: string;
    limitTitle: string;
    limitContent: string;
    learnMore: string;
    subscribe: string;
    tryLater: string;
    noteEmpty: string;
  }

  export interface Details {
    myCode: string;
    otherCode: string;
    sampleCode: string;
    backToMyCode: string;
    chartHintForAction: string;
    fetchingCodeFromServer: string;
  }

  export interface FailedSubmission {
    runtimeError: string;
    compileError: string;
    lastTestcase: string;
  }

  export interface Filters {
    allStatuses: string;
    allLanguages: string;
    time: string;
    status: string;
    language: string;
    framework: string;
    runtime: string;
    memory: string;
    notes: string;
    penaltyTime: string;
    minute: string;
  }

  export interface NonSignedIn {
    signInTitle: string;
    signInInfo: string;
    signInButton: string;
  }

  export interface Notes {
    label: string;
    placeholder: string;
  }

  export interface RelatedTags {
    label: string;
    placeholder: string;
    startTyping: string;
    noResults: string;
  }

  export interface SubmissionPreview {
    embedCode: string;
    copiedEmbedCode: string;
    copyEmbedCode: string;
    copyEmbedCodeTooltip: string;
    copyLinkTooltip: string;
    openInNewTabTooltip: string;
    openInPanelTooltip: string;
    maximizeTooltip: string;
    minimizeTooltip: string;
    invalidSubmissionIdLabel: string;
    missingSubmissionIdTooltip: string;
    nonFeSubmissionIdTooltip: string;
    openIn: string;
  }

  export interface Success {
    accept: string;
    timeTaken: string;
    nextQuestion: string;
    moreChallenges: string;
    second_short: string;
    minute_short: string;
    hour_one: string;
    hour_other: string;
    solution: string;
    beatsPercentage: string;
    ofUsersWithLanguage: string;
  }

  export interface UserConfig {
    i18n: I18N;
    react: React;
    reloadOnPrerender: boolean;
    default?: UserConfig;
  }

  export interface I18N {
    defaultLocale: string;
    locales: string[];
  }

  export interface React {
    useSuspense: boolean;
  }

  export interface DehydratedState {
    mutations: any[];
    queries: QueryElement[];
  }

  export interface QueryElement {
    state: State;
    queryKey: Array<QueryKeyClass | string>;
    queryHash: string;
  }

  export interface QueryKeyClass {
    titleSlug?: string;
    questionSlug?: string;
    topicId?: number;
  }

  export interface State {
    data: StateData;
    dataUpdateCount: number;
    dataUpdatedAt: number;
    error: null;
    errorUpdateCount: number;
    errorUpdatedAt: number;
    fetchFailureCount: number;
    fetchFailureReason: null;
    fetchMeta: null;
    isInvalidated: boolean;
    status: StatusEnum;
    fetchStatus: FetchStatus;
  }

  export interface StateData {
    question?: FluffyQuestion;
    languageList?: LanguageList[];
    solutionNum?: number;
    topic?: Topic;
    enableIdeDynamicLayoutFeature?: boolean;
    interviewed?: Interviewed;
  }

  export interface Interviewed {
    companies: any[];
    popularCompanies: PopularCompany[];
    timeOptions: LanguageList[];
    stageOptions: LanguageList[];
    positions: Position[];
  }

  export interface PopularCompany {
    id: number;
    name: string;
    slug: string;
  }

  export interface Position {
    id: string;
    name: string;
    nameTranslated: string;
  }

  export interface LanguageList {
    id: number;
    name: string;
  }

  export interface FluffyQuestion {
    questionId?: string;
    questionFrontendId?: string;
    title?: string;
    titleSlug?: string;
    isPaidOnly?: boolean;
    difficulty?: string;
    likes?: number;
    dislikes?: number;
    categoryTitle?: string;
    translatedTitle?: string;
    translatedContent?: string;
    questionTitle?: string;
    enableRunCode?: boolean;
    enableSubmit?: boolean;
    enableTestMode?: boolean;
    jsonExampleTestcases?: string;
    exampleTestcases?: string;
    metaData?: string;
    sampleTestCase?: string;
    hints?: any[];
    content?: string;
    editorType?: string;
    mysqlSchemas?: any[];
    dataSchemas?: any[];
    stats?: string;
    topicTags?: TopicTag[];
  }

  export interface TopicTag {
    name: string;
    slug: string;
    translatedName: string;
  }

  export interface Topic {
    id: number;
    commentCount: number;
  }

  export enum FetchStatus {
    Idle = 'idle'
  }

  export enum StatusEnum {
    Success = 'success'
  }

  export interface ExampleGenerateQuery {
    slug: string;
    tab: string[];
  }
}

export namespace LCComments {
  export interface Data {
    commonTopicComments: CommonTopicComments;
  }

  export interface CommonTopicComments {
    edges: Edge[];
    totalNum: number;
  }

  export interface Edge {
    node: Node;
  }

  export interface Node {
    id: string;
    ipRegion: string;
    numChildren: number;
    isEdited: boolean;
    post: Post;
  }

  export interface Post {
    id: number;
    content: string;
    voteUpCount: number;
    creationDate: number;
    updationDate: number;
    status: Status;
    voteStatus: number;
    isOwnPost: boolean;
    author: Author;
    mentionedUsers: any[];
  }

  export interface Author {
    username: string;
    isDiscussAdmin: boolean;
    isDiscussStaff: boolean;
    profile: Profile;
  }

  export interface Profile {
    userSlug: string;
    userAvatar: string;
    realName: string;
  }

  export enum Status {
    Open = 'Open'
  }

  export interface Extra {}
}
