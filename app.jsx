import React, { useState } from "react";
import {
  LayoutDashboard,
  Brain,
  Target,
  BarChart3,
  BookOpen,
  Search,
  Bell,
  ChevronRight,
  AlertTriangle,
  Clock3,
  Lightbulb,
  Network,
  ArrowUpRight,
  Sparkles,
  Menu,
  X,
  Play,
  TrendingUp,
  CircleHelp,
  CheckCircle2,
  User,
  ArrowRight,
} from "lucide-react";
import "./app.css";

const studentsData = [
  {
    id: "std-1",
    name: "Pavani K.",
    role: "Student",
    program: "B.Tech • Computer Science & Eng.",
    semester: "6th Semester",
    targetExam: "GATE CS & End-Semester Finals",
    daysLeft: 18,
    streak: 7,
    avatar: "P",
    readiness: 68,
    mastery: 74,
    topicsAtRisk: 4,
    studyHoursSaved: "14.5 hrs",
    subMetrics: {
      conceptMastery: 78,
      prerequisiteCoverage: 61,
      consistency: 72,
      timeManagement: 54,
    },
  },
  {
    id: "std-2",
    name: "Rahul Verma",
    role: "Student",
    program: "B.Tech • Information Technology",
    semester: "6th Semester",
    targetExam: "Campus Technical Placements",
    daysLeft: 24,
    streak: 12,
    avatar: "R",
    readiness: 76,
    mastery: 81,
    topicsAtRisk: 2,
    studyHoursSaved: "9.0 hrs",
    subMetrics: {
      conceptMastery: 84,
      prerequisiteCoverage: 79,
      consistency: 85,
      timeManagement: 62,
    },
  },
  {
    id: "std-3",
    name: "Sneha Reddy",
    role: "Student",
    program: "B.Tech • Computer Science & Eng.",
    semester: "4th Semester",
    targetExam: "Data Structures Mid-Term",
    daysLeft: 9,
    streak: 4,
    avatar: "S",
    readiness: 59,
    mastery: 63,
    topicsAtRisk: 6,
    studyHoursSaved: "18.0 hrs",
    subMetrics: {
      conceptMastery: 65,
      prerequisiteCoverage: 48,
      consistency: 60,
      timeManagement: 45,
    },
  },
];

const topics = [
  {
    id: "bst",
    name: "Binary Search Trees",
    subject: "Data Structures",
    mastery: 52,
    status: "At Risk",
    color: "red",
    prereq: "Tree Traversal Invariants & Pointer Referencing",
    causalInsight: "Low accuracy is 82% caused by misunderstanding Inorder Traversal order, not BST logic itself.",
  },
  {
    id: "rec",
    name: "Recursion & Stack Frames",
    subject: "Data Structures",
    mastery: 68,
    status: "Developing",
    color: "yellow",
    prereq: "Call Stack Mechanics",
    causalInsight: "Repeated base-case boundary errors propagate into 3 downstream algorithmic topics.",
  },
  {
    id: "sql",
    name: "SQL Joins & Indexing",
    subject: "DBMS",
    mastery: 84,
    status: "Strong",
    color: "green",
    prereq: "Relational Algebra",
    causalInsight: "Solid foundational grasp of set operations ensures consistent high score across join types.",
  },
  {
    id: "sched",
    name: "Process Scheduling",
    subject: "Operating Systems",
    mastery: 73,
    status: "Developing",
    color: "yellow",
    prereq: "Queue Data Structures & Preemption Invariants",
    causalInsight: "Slight drop when context-switch overheads are introduced under multi-level queues.",
  },
  {
    id: "dp",
    name: "Dynamic Programming",
    subject: "Algorithms",
    mastery: 44,
    status: "At Risk",
    color: "red",
    prereq: "Recursion & Overlapping Subproblems",
    causalInsight: "Root cause is poor recursive tree visualization; memorizing DP tables yields 0 transferability.",
  },
  {
    id: "mem",
    name: "Virtual Memory & Paging",
    subject: "Operating Systems",
    mastery: 62,
    status: "Developing",
    color: "yellow",
    prereq: "Memory Addressing & TLB Mechanics",
    causalInsight: "Page replacement algorithm errors stem from misunderstanding LRU hardware bit tracking.",
  },
];

const recommendationsList = [
  {
    id: "rec-1",
    title: "Master Binary Tree Traversal Invariants",
    targetConcept: "Tree Traversal (Inorder / Preorder)",
    reason: "Causal engine detected that 84% of your BST insertion and deletion mistakes are direct consequences of weak Inorder traversal invariants.",
    confidence: 86,
    priority: "High",
    timeEstimate: "1.5 hours",
    downstreamBenefit: "+22% predicted gain on BST & AVL Trees",
    icon: Network,
  },
  {
    id: "rec-2",
    title: "Practice Recursion Call Stack Unwinding",
    targetConcept: "Stack Frames & Base Cases",
    reason: "Repeated boundary slips observed in recursive traversals. Fixing call-stack mental model unlocks Dynamic Programming.",
    confidence: 78,
    priority: "Medium",
    timeEstimate: "2.0 hours",
    downstreamBenefit: "+18% predicted gain on Divide & Conquer",
    icon: Brain,
  },
  {
    id: "rec-3",
    title: "Calibrated Speed Drills on SQL Queries",
    targetConcept: "Complex Multi-Table Joins",
    reason: "Accuracy is 84% on standard questions, but decreases by 19% under 60-second time limits due to hasty subquery checks.",
    confidence: 72,
    priority: "Medium",
    timeEstimate: "45 mins",
    downstreamBenefit: "+8% speed consistency before exam",
    icon: Clock3,
  },
  {
    id: "rec-4",
    title: "Pointer Dereferencing & Reference Mutation",
    targetConcept: "Pointers & Heap Allocation",
    reason: "Underlying structural root cause affecting both Linked Lists and Balanced Tree Rotations.",
    confidence: 91,
    priority: "High",
    timeEstimate: "1.0 hour",
    downstreamBenefit: "+27% structural comprehension boost",
    icon: Brain,
  },
];

const quizHistory = [
  {
    id: "qz-104",
    title: "Binary Search Tree Operations & Properties",
    subject: "Data Structures",
    date: "Sep 25, 2026",
    score: "50%",
    correct: 5,
    total: 10,
    timeSpent: "14m 20s",
    status: "Needs Review",
    diagnosis: "Prerequisite Gap: Inorder Invariant error caused 4 out of 5 missed questions.",
  },
  {
    id: "qz-103",
    title: "SQL Joins, Aggregation & Group By",
    subject: "DBMS",
    date: "Sep 23, 2026",
    score: "85%",
    correct: 17,
    total: 20,
    timeSpent: "22m 10s",
    status: "Mastered",
    diagnosis: "High mastery. Minor slip on NULL handling in LEFT OUTER JOIN.",
  },
  {
    id: "qz-102",
    title: "CPU Scheduling Algorithms (FCFS, SJF, RR)",
    subject: "Operating Systems",
    date: "Sep 20, 2026",
    score: "70%",
    correct: 7,
    total: 10,
    timeSpent: "11m 45s",
    status: "Developing",
    diagnosis: "Gantt chart calculation errors during preemptive priority changes.",
  },
  {
    id: "qz-101",
    title: "Recursion & Backtracking Fundamentals",
    subject: "Data Structures",
    date: "Sep 18, 2026",
    score: "65%",
    correct: 13,
    total: 20,
    timeSpent: "28m 30s",
    status: "Developing",
    diagnosis: "Causal Gap: Missing return statement in recursive accumulator branches.",
  },
];

const causalNodes = {
  "node-ptr": {
    id: "node-ptr",
    name: "Memory & Pointers",
    category: "Foundational Prerequisite",
    stage: 1,
    mastery: 44,
    status: "rootCause",
    statusLabel: "Root-Cause Gap",
    causalInfluence: "89% Causal Weight",
    description: "Direct memory addressing, dereferencing, and pointer updates in node manipulation.",
    evidence: "Failed 4 pointer re-linking sub-steps across Quiz #101 & #104.",
  },
  "node-rec": {
    id: "node-rec",
    name: "Call Stack Recursion",
    category: "Foundational Prerequisite",
    stage: 1,
    mastery: 66,
    status: "developing",
    statusLabel: "Developing",
    causalInfluence: "74% Causal Weight",
    description: "Activation records, recursive call unwinding, and base case termination.",
    evidence: "Stack overflow simulation missed on deep recursion depth test.",
  },
  "node-traversal": {
    id: "node-traversal",
    name: "Tree Traversal Invariants",
    category: "Intermediate Concept",
    stage: 2,
    mastery: 48,
    status: "symptom",
    statusLabel: "Prerequisite Bottleneck",
    causalInfluence: "92% Causal Weight",
    description: "Inorder visit properties (L-Root-R) and preserving sorting during subtree walks.",
    evidence: "Misidentified sorted order retrieval sequence in 3 consecutive quizzes.",
  },
  "node-bst": {
    id: "node-bst",
    name: "BST Search & Deletion",
    category: "Target Exam Topic",
    stage: 3,
    mastery: 52,
    status: "symptom",
    statusLabel: "Symptomatic Failure",
    causalInfluence: "Exam Topic (8 Marks)",
    description: "Maintaining binary search tree ordering during two-child node deletions.",
    evidence: "Student repeatedly practices BST deletion but fails because Inorder Successor concept is missing.",
  },
  "node-avl": {
    id: "node-avl",
    name: "AVL & Red-Black Rotations",
    category: "Advanced Exam Topic",
    stage: 3,
    mastery: 34,
    status: "symptom",
    statusLabel: "Severe Symptom",
    causalInfluence: "Exam Topic (10 Marks)",
    description: "Left/Right balance factor restoration and pointer swapping.",
    evidence: "Direct consequence of pointer confusion + traversal blindness.",
  },
};

const practiceQuestions = [
  {
    id: 1,
    tag: "CORE PREREQUISITE • TREE INVARIANTS",
    question: "Which tree traversal of a Binary Search Tree (BST) is guaranteed to produce values in strictly ascending sorted order?",
    options: [
      "Preorder Traversal (Root, Left, Right)",
      "Inorder Traversal (Left, Root, Right)",
      "Postorder Traversal (Left, Right, Root)",
      "Level-Order (Breadth First Search)",
    ],
    correct: 1,
    explanation: "In a valid BST, for any node N, all values in its left subtree are < N, and all values in its right subtree are > N. Thus Inorder traversal (Left, then Root, then Right) processes nodes in ascending order.",
    causalNote: "Understanding this is the critical prerequisite before solving BST insertion, deletion, or range search problems.",
  },
  {
    id: 2,
    tag: "COMMON MISTAKE PATTERN • NODE MUTATION",
    question: "During BST node deletion, when the node to be removed has two children, which node is swapped with it to preserve the BST invariant?",
    options: [
      "The root node of the entire tree",
      "The Inorder Predecessor or Inorder Successor",
      "The right child directly, discarding the left child",
      "Any randomly selected leaf node",
    ],
    correct: 1,
    explanation: "The Inorder Successor (the smallest value in the right subtree) or Inorder Predecessor (the largest value in the left subtree) is strictly greater than all left descendants and smaller than all right descendants, perfectly preserving the BST property.",
    causalNote: "Students who score low here usually fail because they memorize deletion steps without understanding Inorder traversal ordering.",
  },
  {
    id: 3,
    tag: "COMPLEXITY ANALYSIS • PREREQUISITE",
    question: "What is the worst-case time complexity of searching in an unbalanced degenerate (skewed) Binary Search Tree with N nodes?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correct: 2,
    explanation: "In the worst case (e.g. inserting elements already in sorted order 1, 2, 3, ...), the BST degenerates into a single linked list, resulting in O(N) search time.",
    causalNote: "This exact limitation is the causal motivation for introducing Self-Balancing Trees (AVL / Red-Black Trees).",
  },
];

export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [currentStudentIdx, setCurrentStudentIdx] = useState(0);
  const [activeWhyRec, setActiveWhyRec] = useState(null);
  const [activeEvidenceTopic, setActiveEvidenceTopic] = useState(null);

  const student = studentsData[currentStudentIdx];

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Causal Analysis", icon: Brain, badge: "SIH 210" },
    { name: "Knowledge Gaps", icon: Network },
    { name: "Quiz Performance", icon: BarChart3 },
    { name: "Practice", icon: BookOpen },
    { name: "Recommendations", icon: Lightbulb, count: 4 },
    { name: "Exam Readiness", icon: Target },
    { name: "Student Profile", icon: User },
  ];

  const go = (page) => {
    setActive(page);
    setMobileMenu(false);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand" onClick={() => go("Dashboard")}>
          <div className="logo">
            <Brain size={22} />
          </div>
          <div>
            <h2>CausalGap <span className="brand-badge">SIH 210</span></h2>
            <span>Learn the cause, not just the mistake.</span>
          </div>
        </div>

        <div className="searchBox">
          <Search size={18} />
          <input
            placeholder="Search topics, quizzes, knowledge gaps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <kbd>⌘ K</kbd>
        </div>

        <div className="topActions">
          <button className="iconBtn" title="Alerts">
            <Bell size={19} />
            <span className="notificationBadge" />
          </button>
          <div className="avatar" onClick={() => go("Student Profile")}>
            {student.avatar}
          </div>
          <button
            className="mobileBtn"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className={mobileMenu ? "sidebar open" : "sidebar"}>
          <div className="menuLabel">WORKSPACE</div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={active === item.name ? "navItem active" : "navItem"}
                onClick={() => go(item.name)}
              >
                <Icon size={19} />
                <span>{item.name}</span>
                {item.count && <b className="count">{item.count}</b>}
                {item.badge && (
                  <span
                    style={{
                      fontSize: "0.65rem",
                      background: "#e0e7ff",
                      color: "#4338ca",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontWeight: 700,
                      marginLeft: "auto",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="sidebarBottom">
            <div className="miniCard">
              <Sparkles size={18} />
              <strong>{student.streak} day streak</strong>
              <span>Causal learning pace active</span>
            </div>

            <button className="profile" onClick={() => go("Student Profile")}>
              <div className="avatar small">{student.avatar}</div>
              <div>
                <strong>{student.name}</strong>
                <span>{student.program}</span>
              </div>
              <ChevronRight size={16} />
            </button>
          </div>
        </aside>

        <main className="main">
          {active === "Dashboard" && (
            <Dashboard
              go={go}
              student={student}
              onWhyRec={(r) => setActiveWhyRec(r)}
              onEvidenceTopic={(t) => setActiveEvidenceTopic(t)}
            />
          )}
          {active === "Causal Analysis" && <CausalAnalysis go={go} />}
          {active === "Knowledge Gaps" && <KnowledgeGaps go={go} />}
          {active === "Quiz Performance" && <QuizPerformance go={go} />}
          {active === "Practice" && <Practice />}
          {active === "Recommendations" && (
            <Recommendations onWhyRec={(r) => setActiveWhyRec(r)} go={go} />
          )}
          {active === "Exam Readiness" && (
            <ExamReadiness student={student} go={go} />
          )}
          {active === "Student Profile" && (
            <StudentProfile
              student={student}
              currentIdx={currentStudentIdx}
              onSelectStudent={(i) => setCurrentStudentIdx(i)}
            />
          )}
        </main>
      </div>

      {/* Why Modal */}
      {activeWhyRec && (
        <div className="modalOverlay" onClick={() => setActiveWhyRec(null)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button className="modalCloseBtn" onClick={() => setActiveWhyRec(null)}>
              <X size={18} />
            </button>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff", color: "#1e40af", fontSize: "0.75rem", fontWeight: 700, padding: "4px 10px", borderRadius: 4, marginBottom: 10 }}>
              <Brain size={15} /> Causal Attribution Engine Explanation
            </div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: 8 }}>
              {activeWhyRec.title}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--subtext)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
              {activeWhyRec.reason}
            </p>
            <div style={{ background: "var(--surface-alt)", borderRadius: "var(--radius-md)", padding: "1rem", border: "1px solid var(--border)", fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: 8 }}>
              <div><strong>Target Concept:</strong> <span style={{ color: "var(--primary)", fontWeight: 600 }}>{activeWhyRec.targetConcept}</span></div>
              <div><strong>Confidence:</strong> {activeWhyRec.confidence}% (Calculated via Bayesian Causal Inference)</div>
              <div><strong>Downstream Yield:</strong> <span style={{ color: "var(--success)", fontWeight: 700 }}>{activeWhyRec.downstreamBenefit}</span></div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: "1.5rem" }}>
              <button className="outlineBtn" onClick={() => setActiveWhyRec(null)}>Close</button>
              <button className="primaryBtn" onClick={() => { setActiveWhyRec(null); go("Practice"); }}>
                Start Guided Practice <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Evidence Modal */}
      {activeEvidenceTopic && (
        <div className="modalOverlay" onClick={() => setActiveEvidenceTopic(null)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button className="modalCloseBtn" onClick={() => setActiveEvidenceTopic(null)}>
              <X size={18} />
            </button>
            <div className="eyebrow" style={{ marginBottom: 6 }}>EMPIRICAL EVIDENCE LOG</div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: 6 }}>
              {activeEvidenceTopic.name}
            </h2>
            <p style={{ fontSize: "0.88rem", color: "var(--subtext)", marginBottom: "1.25rem" }}>
              Subject: {activeEvidenceTopic.subject} • Mastery: {activeEvidenceTopic.mastery}%
            </p>
            <div style={{ background: "#fef2f2", borderLeft: "4px solid #ef4444", padding: 12, borderRadius: 4, marginBottom: "1rem" }}>
              <strong style={{ color: "#991b1b", fontSize: "0.88rem" }}>Causal Diagnosis:</strong>
              <p style={{ fontSize: "0.84rem", color: "#7f1d1d", marginTop: 4 }}>
                {activeEvidenceTopic.causalInsight}
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
              <button className="primaryBtn" onClick={() => { setActiveEvidenceTopic(null); go("Causal Analysis"); }}>
                View in Causal DAG <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({ go, student, onWhyRec, onEvidenceTopic }) {
  return (
    <>
      <div className="pageHeader">
        <div>
          <div className="eyebrow">ACADEMIC DIAGNOSTIC SUITE • SEMESTER 6</div>
          <h1>Good evening, {student.name.split(" ")[0]} 👋</h1>
          <p>Here is your causal knowledge graph diagnostic before the upcoming exams.</p>
        </div>

        <button className="primaryBtn" onClick={() => go("Practice")}>
          <Play size={17} />
          Start Targeted Practice
        </button>
      </div>

      <section className="sihBanner">
        <div className="sihBannerContent">
          <div className="sihBannerTag"><Brain size={14} /> SIH Problem Statement 210 Feature</div>
          <h3>Causal Knowledge Gap Engine Active</h3>
          <p>
            Unlike naive platforms that correlate <em>"low score = weak topic"</em> and force brute-force drilling, 
            <strong>CausalGap</strong> traces your mistakes upstream to root-cause prerequisite bottlenecks. 
            Fix the root cause, unlock multiple exam topics at once!
          </p>
        </div>
        <button className="sihBannerBtn" onClick={() => go("Causal Analysis")}>
          Explore Causal Chain <ArrowRight size={16} />
        </button>
      </section>

      <section className="stats">
        <Stat title="Overall Mastery" value={`${student.mastery}%`} change="+6.4% this week" icon={Brain} />
        <Stat title="Root-Cause Gaps" value={student.topicsAtRisk} change="Affecting 5 topics" icon={AlertTriangle} danger />
        <Stat title="Exam Readiness" value={`${student.readiness}%`} change="Target: 85%+" icon={Target} />
        <Stat title="Study Hours Saved" value={student.studyHoursSaved} change="Avoided repetitive drilling" icon={Clock3} subtle />
      </section>

      <div className="dashboardGrid">
        <section className="panel signals">
          <PanelTitle
            title="Causal Learning Signals"
            subtitle="Automated causal discovery from recent quiz activity"
            action="Full Graph"
            onClick={() => go("Causal Analysis")}
          />
          <div className="signalList">
            <Signal
              type="danger"
              icon={<AlertTriangle size={18} />}
              title="Prerequisite Bottleneck Detected"
              text="Tree Traversal Invariants error is the true root cause behind 84% of Binary Search Tree and AVL failures."
            />
            <Signal
              type="warning"
              icon={<Network size={18} />}
              title="Multi-Topic Propagation"
              text="Recursion Call Stack confusion is currently blocking progress in Dynamic Programming and Divide-and-Conquer."
            />
            <Signal
              type="success"
              icon={<TrendingUp size={18} />}
              title="Root Cause Resolved: SQL Relations"
              text="Mastering Relational Algebra improved your complex SQL join accuracy from 64% to 84%."
            />
            <Signal
              type="info"
              icon={<Clock3 size={18} />}
              title="Time-Pressure Behavioral Slip"
              text="Performance drops by 19% on multi-step questions under 60-second timers despite high theoretical mastery."
            />
          </div>
        </section>

        <section className="panel readiness">
          <PanelTitle
            title="Exam Readiness"
            subtitle="Multi-dimensional readiness breakdown"
          />
          <div className="readinessCircle" style={{ "--readiness-val": student.readiness }}>
            <div>
              <strong>{student.readiness}%</strong>
              <span>Ready</span>
            </div>
          </div>
          <div className="readinessRows">
            <ProgressRow name="Concept mastery" value={student.subMetrics.conceptMastery} />
            <ProgressRow name="Prerequisite coverage" value={student.subMetrics.prerequisiteCoverage} warning />
            <ProgressRow name="Consistency" value={student.subMetrics.consistency} />
            <ProgressRow name="Time management" value={student.subMetrics.timeManagement} danger />
          </div>
          <button className="outlineBtn" onClick={() => go("Exam Readiness")}>
            View Detailed Breakdown <ArrowUpRight size={16} />
          </button>
        </section>
      </div>

      <section className="panel">
        <PanelTitle
          title="Topic Performance & Prerequisite Links"
          subtitle="Topics prioritized by causal severity rather than simple percentage"
          action="View All Topics"
          onClick={() => go("Knowledge Gaps")}
        />
        <div className="topicGrid">
          {topics.slice(0, 4).map((topic) => (
            <TopicCard key={topic.name} topic={topic} onEvidence={() => onEvidenceTopic(topic)} />
          ))}
        </div>
      </section>

      <section className="panel recommendationPanel">
        <PanelTitle
          title="Causal-Directed Action Items"
          subtitle="Targeted interventions designed to eliminate upstream knowledge bottlenecks"
          action="All Recommendations"
          onClick={() => go("Recommendations")}
        />
        <div className="recommendationGrid">
          {recommendationsList.slice(0, 3).map((r) => (
            <RecommendationCard
              key={r.title}
              item={r}
              onWhy={() => onWhyRec(r)}
              onStart={() => go("Practice")}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function CausalAnalysis({ go }) {
  const [selectedNodeId, setSelectedNodeId] = useState("node-traversal");
  const [sliderVal, setSliderVal] = useState(48);

  const selectedNode = causalNodes[selectedNodeId] || causalNodes["node-traversal"];
  const delta = sliderVal - 48;
  const predictedBST = Math.min(96, Math.max(30, Math.round(52 + delta * 0.65)));
  const predictedAVL = Math.min(94, Math.max(20, Math.round(34 + delta * 0.58)));
  const predictedReadiness = Math.min(98, Math.max(45, Math.round(68 + delta * 0.32)));
  const predictedHours = Math.max(1.5, (14.5 - delta * 0.15).toFixed(1));

  return (
    <div className="causalExplorer">
      <div className="pageHeader">
        <div>
          <div className="eyebrow">SMART INDIA HACKATHON 2024 • PROBLEM STATEMENT 210</div>
          <h1>Causal Knowledge Gap Engine</h1>
          <p>Distinguishing true causal root causes from mere correlation to deliver high-yield interventions.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="outlineBtn" onClick={() => setSliderVal(48)}>
            Reset Baseline
          </button>
          <button className="primaryBtn" onClick={() => go("Practice")}>
            <Play size={16} /> Test Prerequisite
          </button>
        </div>
      </div>

      <div className="causalComparisonCard">
        <div className="comparisonBox bad">
          <div className="comparisonBoxHeader">
            <X size={18} color="var(--danger)" />
            <h4>Traditional Correlation-Based EdTech (Misleading)</h4>
          </div>
          <p>
            Observes: <em>"Student scored 50% on Binary Search Trees and 34% on AVL Trees."</em><br />
            Correlation conclusion: <em>"Student is bad at Trees. Prescribe 50 random tree practice questions."</em>
          </p>
          <div className="exampleChain" style={{ color: "#991b1b" }}>
            <strong>Flaw:</strong> The student wastes 12 hours practicing complex AVL rotations while remaining blind to the unaddressed pointer and traversal misconceptions underneath.
          </div>
        </div>

        <div className="comparisonBox good">
          <div className="comparisonBoxHeader">
            <CheckCircle2 size={18} color="var(--success)" />
            <h4>Causal Reasoning Model (SIH Problem Statement 210)</h4>
          </div>
          <p>
            Traces the Structural Causal Model (DAG):<br />
            <code>Memory Concepts → Inorder Traversal Invariants → BST Deletions → AVL Rotations</code>
          </p>
          <div className="exampleChain" style={{ color: "#166534" }}>
            <strong>Causal Insight:</strong> Intervening on the <strong>Inorder Traversal Invariant</strong> directly resolves 84% of downstream BST mistakes in just 1.5 hours of targeted learning!
          </div>
        </div>
      </div>

      <section className="causalGraphContainer">
        <div className="causalGraphToolbar">
          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Interactive Causal Prerequisite Graph (DAG)</h3>
            <p style={{ fontSize: "0.82rem", color: "var(--subtext)" }}>Click any concept node to inspect its causal dependencies and failure mechanisms</p>
          </div>
          <div className="causalLegend">
            <div className="legendItem">
              <span className="legendDot" style={{ background: "#ef4444" }} />
              <span>Root Cause Gap</span>
            </div>
            <div className="legendItem">
              <span className="legendDot" style={{ background: "#f59e0b" }} />
              <span>Prerequisite Bottleneck</span>
            </div>
            <div className="legendItem">
              <span className="legendDot" style={{ background: "#10b981" }} />
              <span>Developing / Mastered</span>
            </div>
          </div>
        </div>

        <div className="causalChainVisual">
          <div className="causalStage">
            <div className="causalStageHeader">
              <span>Stage 1: Foundational Roots</span>
              <span style={{ fontSize: "0.7rem", color: "var(--primary)" }}>Prerequisites</span>
            </div>
            <div
              className={`causalNode ${selectedNodeId === "node-ptr" ? "selected" : ""} rootCause`}
              onClick={() => setSelectedNodeId("node-ptr")}
            >
              <div className="causalNodeHeader">
                <span className="causalNodeTitle">Memory & Pointers</span>
                <span className="causalNodeBadge root">Root Cause</span>
              </div>
              <div className="causalNodeMetric">
                <span>Mastery: 44%</span>
                <b style={{ color: "var(--danger)" }}>89% Causal Wt.</b>
              </div>
              <div className="bar danger"><span style={{ width: "44%" }} /></div>
            </div>

            <div
              className={`causalNode ${selectedNodeId === "node-rec" ? "selected" : ""}`}
              onClick={() => setSelectedNodeId("node-rec")}
            >
              <div className="causalNodeHeader">
                <span className="causalNodeTitle">Call Stack Recursion</span>
                <span className="causalNodeBadge symptom">Developing</span>
              </div>
              <div className="causalNodeMetric">
                <span>Mastery: 66%</span>
                <b>74% Causal Wt.</b>
              </div>
              <div className="bar warning"><span style={{ width: "66%" }} /></div>
            </div>
          </div>

          <div className="causalConnector"><ArrowRight size={18} /></div>

          <div className="causalStage">
            <div className="causalStageHeader">
              <span>Stage 2: Core Invariants</span>
              <span style={{ fontSize: "0.7rem", color: "var(--warning)" }}>Bottleneck</span>
            </div>
            <div
              className={`causalNode ${selectedNodeId === "node-traversal" ? "selected" : ""} symptom`}
              onClick={() => setSelectedNodeId("node-traversal")}
            >
              <div className="causalNodeHeader">
                <span className="causalNodeTitle">Tree Traversal Invariants</span>
                <span className="causalNodeBadge symptom">Bottleneck</span>
              </div>
              <div className="causalNodeMetric">
                <span>Mastery: 48%</span>
                <b style={{ color: "var(--warning)" }}>92% Causal Wt.</b>
              </div>
              <div className="bar warning"><span style={{ width: "48%" }} /></div>
            </div>
          </div>

          <div className="causalConnector"><ArrowRight size={18} /></div>

          <div className="causalStage">
            <div className="causalStageHeader">
              <span>Stage 3: Exam Target Topics</span>
              <span style={{ fontSize: "0.7rem", color: "var(--text)" }}>Symptomatic Failure</span>
            </div>
            <div
              className={`causalNode ${selectedNodeId === "node-bst" ? "selected" : ""} symptom`}
              onClick={() => setSelectedNodeId("node-bst")}
            >
              <div className="causalNodeHeader">
                <span className="causalNodeTitle">BST Operations</span>
                <span className="causalNodeBadge symptom">Symptom</span>
              </div>
              <div className="causalNodeMetric">
                <span>Quiz Score: 52%</span>
                <span>8 Marks</span>
              </div>
              <div className="bar danger"><span style={{ width: "52%" }} /></div>
            </div>

            <div
              className={`causalNode ${selectedNodeId === "node-avl" ? "selected" : ""} rootCause`}
              onClick={() => setSelectedNodeId("node-avl")}
            >
              <div className="causalNodeHeader">
                <span className="causalNodeTitle">AVL Tree Rotations</span>
                <span className="causalNodeBadge root">Severe</span>
              </div>
              <div className="causalNodeMetric">
                <span>Quiz Score: 34%</span>
                <span>10 Marks</span>
              </div>
              <div className="bar danger"><span style={{ width: "34%" }} /></div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "1.5rem", background: "var(--surface-alt)", borderRadius: "var(--radius-md)", padding: "1.25rem", border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700 }}>
              Active Concept: <span style={{ color: "var(--primary)" }}>{selectedNode.name}</span>
            </h4>
            <span className={`gapTypeBadge ${selectedNode.status === "rootCause" ? "root" : "prereq"}`}>
              {selectedNode.statusLabel}
            </span>
          </div>
          <p style={{ fontSize: "0.88rem", color: "var(--subtext)", lineHeight: 1.45 }}>
            {selectedNode.description}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: 12, fontSize: "0.82rem" }}>
            <div>
              <strong style={{ color: "var(--text)" }}>Causal Attribution:</strong>
              <div style={{ color: "var(--primary)", fontWeight: 700, fontSize: "1rem", marginTop: 2 }}>
                {selectedNode.causalInfluence}
              </div>
            </div>
            <div>
              <strong style={{ color: "var(--text)" }}>Error Pattern:</strong>
              <div style={{ color: "var(--subtext)", marginTop: 2 }}>
                {selectedNode.evidence}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="interventionBox">
        <div className="interventionHeader">
          <h4><Sparkles size={18} /> Counterfactual "What-If" Intervention Simulator</h4>
        </div>
        <p style={{ fontSize: "0.86rem", color: "#334155", lineHeight: 1.45 }}>
          Test the causal hypothesis: <em>"If we intervene on <strong>Tree Traversal Invariants</strong> (do(Prereq = X%)), how do downstream topics respond?"</em>
        </p>

        <div className="sliderContainer">
          <div className="sliderLabels">
            <span>Prerequisite Mastery Intervention:</span>
            <span style={{ color: "var(--primary)", fontSize: "1rem", fontWeight: 800 }}>
              {sliderVal}% {sliderVal > 48 ? `(+${sliderVal - 48}% boost)` : ""}
            </span>
          </div>
          <input
            type="range"
            min="30"
            max="100"
            value={sliderVal}
            className="interventionSlider"
            onChange={(e) => setSliderVal(parseInt(e.target.value, 10))}
          />
        </div>

        <div className="simulationOutcomeGrid">
          <div className="outcomeCard">
            <span>Predicted BST Mastery</span>
            <strong style={{ color: predictedBST >= 70 ? "var(--success)" : "var(--danger)" }}>
              {predictedBST}%
            </strong>
            <small>{predictedBST >= 52 ? `+${predictedBST - 52}% gain` : `${predictedBST - 52}% drop`}</small>
          </div>

          <div className="outcomeCard">
            <span>Predicted AVL Trees</span>
            <strong style={{ color: predictedAVL >= 60 ? "var(--success)" : "var(--warning)" }}>
              {predictedAVL}%
            </strong>
            <small>{predictedAVL >= 34 ? `+${predictedAVL - 34}% gain` : `${predictedAVL - 34}% drop`}</small>
          </div>

          <div className="outcomeCard">
            <span>Predicted Exam Readiness</span>
            <strong style={{ color: "var(--primary)" }}>
              {predictedReadiness}%
            </strong>
            <small>{predictedReadiness >= 68 ? `+${predictedReadiness - 68}% overall` : `${predictedReadiness - 68}% overall`}</small>
          </div>

          <div className="outcomeCard">
            <span>Required Study Time</span>
            <strong style={{ color: "#059669" }}>
              {predictedHours} hrs
            </strong>
            <small>65% faster than naive drill</small>
          </div>
        </div>
      </section>
    </div>
  );
}

function KnowledgeGaps({ go }) {
  const [filter, setFilter] = useState("all");
  const gaps = [
    { concept: "Tree Traversal Invariants", subject: "Data Structures", type: "Prerequisite Gap", badge: "prereq", frequency: "4 errors / 3 quizzes", downstream: "Binary Search Trees, AVL Trees, Heaps", fixTime: "1.5 hrs" },
    { concept: "Pointer Referencing & Aliasing", subject: "Data Structures", type: "Root-Cause Gap", badge: "root", frequency: "6 errors / 4 quizzes", downstream: "Linked Lists, Tree Rotations, Graphs", fixTime: "1.0 hr" },
    { concept: "Recursion Stack Frame Unwinding", subject: "Algorithms", type: "Prerequisite Gap", badge: "prereq", frequency: "3 errors / 2 quizzes", downstream: "Dynamic Programming, Divide & Conquer", fixTime: "2.0 hrs" },
    { concept: "Process State Preemption Invariants", subject: "Operating Systems", type: "Conceptual Slip", badge: "slip", frequency: "2 errors / 1 quiz", downstream: "Round Robin, Multilevel Feedback Queues", fixTime: "45 mins" },
    { concept: "SQL NULL Logic in Outer Joins", subject: "DBMS", type: "Edge-Case Slip", badge: "slip", frequency: "1 error / 2 quizzes", downstream: "Complex Aggregation Queries", fixTime: "30 mins" },
  ];

  const filtered = gaps.filter((g) => {
    if (filter === "root") return g.badge === "root";
    if (filter === "prereq") return g.badge === "prereq";
    if (filter === "slip") return g.badge === "slip";
    return true;
  });

  return (
    <div className="panel">
      <div className="pageHeader">
        <div>
          <div className="eyebrow">DIAGNOSTIC MATRIX</div>
          <h1>Knowledge Gap Analysis</h1>
          <p>Differentiating upstream root causes from surface symptoms across all subjects.</p>
        </div>
      </div>

      <div className="gapFilterBar" style={{ marginTop: "1.5rem" }}>
        <div className="filterTabs">
          <button className={`filterTab ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All Gaps ({gaps.length})</button>
          <button className={`filterTab ${filter === "root" ? "active" : ""}`} onClick={() => setFilter("root")}>Root-Cause</button>
          <button className={`filterTab ${filter === "prereq" ? "active" : ""}`} onClick={() => setFilter("prereq")}>Prerequisites</button>
          <button className={`filterTab ${filter === "slip" ? "active" : ""}`} onClick={() => setFilter("slip")}>Execution Slips</button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="gapTable">
          <thead>
            <tr>
              <th>Concept</th>
              <th>Subject</th>
              <th>Causal Classification</th>
              <th>Error Frequency</th>
              <th>Downstream Propagation</th>
              <th>Targeted Fix</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((g) => (
              <tr key={g.concept}>
                <td><strong>{g.concept}</strong></td>
                <td>{g.subject}</td>
                <td><span className={`gapTypeBadge ${g.badge}`}>{g.type}</span></td>
                <td>{g.frequency}</td>
                <td style={{ fontSize: "0.8rem", color: "#475569" }}>{g.downstream}</td>
                <td style={{ fontWeight: 700, color: "var(--primary)" }}>{g.fixTime}</td>
                <td>
                  <button className="primarySmall" onClick={() => go("Practice")}>
                    Resolve <ArrowRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuizPerformance({ go }) {
  return (
    <div className="panel">
      <div className="pageHeader">
        <div>
          <div className="eyebrow">HISTORICAL EVALUATIONS</div>
          <h1>Past Quiz Performance</h1>
          <p>Review past assessment scores and the causal mistakes detected by the diagnostic engine.</p>
        </div>
        <button className="primaryBtn" onClick={() => go("Practice")}>
          <Play size={16} /> Take New Practice Quiz
        </button>
      </div>

      <div style={{ overflowX: "auto", marginTop: "1.5rem" }}>
        <table className="gapTable">
          <thead>
            <tr>
              <th>Assessment Title</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Score</th>
              <th>Accuracy</th>
              <th>Causal Diagnosis Summary</th>
            </tr>
          </thead>
          <tbody>
            {quizHistory.map((q) => (
              <tr key={q.id}>
                <td><strong>{q.title}</strong></td>
                <td>{q.subject}</td>
                <td>{q.date}</td>
                <td><strong style={{ color: parseInt(q.score) >= 75 ? "var(--success)" : "var(--danger)" }}>{q.score}</strong></td>
                <td>{q.correct} / {q.total}</td>
                <td style={{ fontSize: "0.8rem", color: "#334155" }}>{q.diagnosis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Practice() {
  const [started, setStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState({});

  if (started) {
    const q = practiceQuestions[qIdx];
    const isAnswered = selectedAns[qIdx] !== undefined;

    return (
      <div>
        <div className="pageHeader">
          <div>
            <div className="eyebrow">DIAGNOSTIC QUIZ IN PROGRESS</div>
            <h1>Prerequisite Focus: Tree Invariants</h1>
            <p>Evaluating root-cause mental models in binary search structures.</p>
          </div>
          <div className="timer"><Clock3 size={17} /> 14:15 remaining</div>
        </div>

        <div className="quizPanel">
          <div className="quizProgress">
            <span>Question {qIdx + 1} of {practiceQuestions.length}</span>
            <span>{Math.round(((qIdx + 1) / practiceQuestions.length) * 100)}%</span>
          </div>
          <div className="bar large">
            <span style={{ width: `${((qIdx + 1) / practiceQuestions.length) * 100}%` }} />
          </div>

          <div className="question">
            <span className="questionTag">{q.tag}</span>
            <h2>{q.question}</h2>

            <div className="optionsList">
              {q.options.map((opt, i) => {
                let optClass = "option";
                if (isAnswered) {
                  if (i === q.correct) optClass += " correct";
                  else if (i === selectedAns[qIdx]) optClass += " wrong";
                }
                return (
                  <button
                    key={opt}
                    className={optClass}
                    onClick={() => {
                      if (!isAnswered) {
                        setSelectedAns({ ...selectedAns, [qIdx]: i });
                      }
                    }}
                  >
                    <span>{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="quizFeedback">
                <strong style={{ color: selectedAns[qIdx] === q.correct ? "var(--success)" : "var(--danger)" }}>
                  {selectedAns[qIdx] === q.correct ? "✓ Correct!" : "✗ Concept Mistake Detected!"}
                </strong>
                <p style={{ fontSize: "0.85rem", marginTop: 4 }}>{q.explanation}</p>
                <div style={{ fontSize: "0.78rem", background: "#eff6ff", color: "#1e40af", padding: "8px 12px", borderRadius: 6, marginTop: 6 }}>
                  <strong>Causal Diagnostic:</strong> {q.causalNote}
                </div>
              </div>
            )}
          </div>

          <div className="quizFooter">
            <button className="outlineBtn" onClick={() => setStarted(false)}>Exit Quiz</button>
            {qIdx < practiceQuestions.length - 1 ? (
              <button
                className="primaryBtn"
                disabled={!isAnswered}
                style={!isAnswered ? { opacity: 0.5 } : {}}
                onClick={() => setQIdx(qIdx + 1)}
              >
                Next Question <ChevronRight size={16} />
              </button>
            ) : (
              <button
                className="primaryBtn"
                disabled={!isAnswered}
                style={!isAnswered ? { opacity: 0.5 } : {}}
                onClick={() => {
                  alert("Evaluation complete! Prerequisite mastery updated.");
                  setStarted(false);
                }}
              >
                Finish <CheckCircle2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel" style={{ textAlign: "center", padding: "3.5rem 1.5rem", maxWidth: 720, margin: "0 auto" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary)", display: "grid", placeItems: "center", margin: "0 auto 1.5rem" }}>
        <BookOpen size={30} />
      </div>
      <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 8 }}>Ready for Prerequisite Calibration?</h2>
      <p style={{ fontSize: "0.95rem", color: "var(--subtext)", maxWidth: 500, margin: "0 auto 1.75rem", lineHeight: 1.5 }}>
        This session directly targets <strong>Tree Traversal Invariants</strong> and <strong>BST Invariant Maintenance</strong> to repair the causal bottleneck discovered in Quiz #104.
      </p>
      <button className="primaryBtn" onClick={() => setStarted(true)} style={{ padding: "12px 28px", fontSize: "1rem", margin: "0 auto" }}>
        <Play size={18} /> Start 3-Question Diagnostic
      </button>
    </div>
  );
}

function Recommendations({ onWhyRec, go }) {
  return (
    <div className="panel">
      <PanelTitle
        title="Personalized Learning Recommendations"
        subtitle="AI-driven recommendations prioritized to eliminate root-cause prerequisite gaps before your exam"
      />
      <div className="recommendationGrid" style={{ marginTop: "1rem" }}>
        {recommendationsList.map((r) => (
          <RecommendationCard
            key={r.title}
            item={r}
            onWhy={() => onWhyRec(r)}
            onStart={() => go("Practice")}
          />
        ))}
      </div>
    </div>
  );
}

function ExamReadiness({ student, go }) {
  return (
    <div className="dashboardGrid">
      <section className="panel">
        <PanelTitle
          title="Exam Readiness Vectors"
          subtitle="Key indicators evaluated by the causal diagnostic model"
        />
        <div className="readinessRows" style={{ marginTop: "1.5rem" }}>
          <ProgressRow name="Concept mastery" value={student.subMetrics.conceptMastery} />
          <ProgressRow name="Prerequisite coverage" value={student.subMetrics.prerequisiteCoverage} warning />
          <ProgressRow name="Consistency" value={student.subMetrics.consistency} />
          <ProgressRow name="Time management" value={student.subMetrics.timeManagement} danger />
        </div>
      </section>

      <section className="panel">
        <PanelTitle title="Exam Projected Score" subtitle="Based on causal mastery" />
        <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
          <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--primary)" }}>
            {student.readiness} / 100
          </div>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--subtext)" }}>Current Projected Mark</span>
        </div>
        <button className="primaryBtn" style={{ width: "100%", justifyContent: "center" }} onClick={() => go("Causal Analysis")}>
          Launch Intervention Plan <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
}

function StudentProfile({ student, currentIdx, onSelectStudent }) {
  return (
    <div className="profileContainer">
      <div className="profileCard">
        <div className="profileAvatarLg">{student.avatar}</div>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 800 }}>{student.name}</h2>
        <span style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 600 }}>{student.program}</span>
        <span style={{ fontSize: "0.78rem", color: "var(--subtext)" }}>{student.semester}</span>

        <div className="profileMetaList">
          <div className="profileMetaItem"><span>Target Exam</span><strong>{student.targetExam}</strong></div>
          <div className="profileMetaItem"><span>Countdown</span><strong style={{ color: "var(--danger)" }}>{student.daysLeft} days left</strong></div>
          <div className="profileMetaItem"><span>Exam Readiness</span><strong style={{ color: "var(--primary)" }}>{student.readiness}%</strong></div>
          <div className="profileMetaItem"><span>Practice Streak</span><strong>{student.streak} days</strong></div>
        </div>
      </div>

      <section className="panel">
        <PanelTitle
          title="Switch Evaluation Persona (SIH Demo Mode)"
          subtitle="Simulate different student scenarios with distinct causal gap patterns"
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {studentsData.map((std, idx) => (
            <div
              key={std.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 14,
                borderRadius: "var(--radius-md)",
                border: `1.5px solid ${idx === currentIdx ? "var(--primary)" : "var(--border)"}`,
                background: idx === currentIdx ? "var(--primary-light)" : "var(--surface)",
                cursor: "pointer",
              }}
              onClick={() => onSelectStudent(idx)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="avatar">{std.avatar}</div>
                <div>
                  <strong>{std.name}</strong>
                  <p style={{ fontSize: "0.78rem", color: "var(--subtext)" }}>
                    {std.program} • Readiness: {std.readiness}% • {std.topicsAtRisk} Root Gaps
                  </p>
                </div>
              </div>
              {idx === currentIdx && (
                <span style={{ fontSize: "0.75rem", background: "var(--primary)", color: "#fff", padding: "3px 8px", borderRadius: 4, fontWeight: 700 }}>
                  Active
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ title, value, change, icon: Icon, danger, subtle }) {
  return (
    <div className="statCard">
      <div className="statTop">
        <span>{title}</span>
        <div className={`statIcon ${danger ? "danger" : ""}`}>
          <Icon size={18} />
        </div>
      </div>
      <strong>{value}</strong>
      <small className={subtle ? "subtle" : ""}>
        {!subtle && <TrendingUp size={13} />} {change}
      </small>
    </div>
  );
}

function PanelTitle({ title, subtitle, action, onClick }) {
  return (
    <div className="panelTitle">
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      {action && (
        <button onClick={onClick} className="textBtn">
          {action} <ChevronRight size={15} />
        </button>
      )}
    </div>
  );
}

function Signal({ type, icon, title, text }) {
  return (
    <div className={`signal ${type}`}>
      <div className="signalIcon">{icon}</div>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function ProgressRow({ name, value, warning, danger }) {
  return (
    <div className="progressRow">
      <div>
        <span>{name}</span>
        <b>{value}%</b>
      </div>
      <div className={`bar ${danger ? "danger" : warning ? "warning" : ""}`}>
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function TopicCard({ topic, onEvidence }) {
  return (
    <div className="topicCard">
      <div className="topicTop">
        <div className={`topicDot ${topic.color}`} />
        <span className={`status ${topic.color}`}>{topic.status}</span>
      </div>
      <h4>{topic.name}</h4>
      <span className="subject">{topic.subject}</span>
      <div className="topicScore">
        <strong>{topic.mastery}%</strong>
        <span>mastery</span>
      </div>
      <div className={`bar ${topic.color === "red" ? "danger" : topic.color === "yellow" ? "warning" : "success"}`}>
        <span style={{ width: `${topic.mastery}%` }} />
      </div>
      <button className="topicLink" onClick={onEvidence}>
        View evidence <ArrowUpRight size={15} />
      </button>
    </div>
  );
}

function RecommendationCard({ item, onWhy, onStart }) {
  const Icon = item.icon || Brain;
  return (
    <div className="recCard">
      <div className="recIcon">
        <Icon size={20} />
      </div>
      <div className="recContent">
        <div className="recHeader">
          <span className={`priority ${item.priority.toLowerCase()}`}>
            {item.priority}
          </span>
          <span className="confidence">{item.confidence}% confidence</span>
        </div>
        <h4>{item.title}</h4>
        <p>{item.reason}</p>
        <div className="recCausalBadge">
          <Sparkles size={14} /> {item.downstreamBenefit}
        </div>
        <div className="recActions">
          <button className="primarySmall" onClick={onStart}>
            Start <ArrowUpRight size={14} />
          </button>
          <button className="whyBtn" onClick={onWhy}>
            <CircleHelp size={14} /> Why?
          </button>
        </div>
      </div>
    </div>
  );
}
