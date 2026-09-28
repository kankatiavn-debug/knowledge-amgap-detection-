/**
 * CausalGap - SIH Problem Statement 210
 * "Create a system that identifies knowledge gaps before an exam from past quiz performance,
 * using causal reasoning rather than simple correlation, to avoid misleading recommendations."
 */

(function () {
  'use strict';

  // ==========================================
  // 1. DATA MODELS & STATE MANAGEMENT
  // ==========================================

  const students = [
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
        timeManagement: 54
      }
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
        timeManagement: 62
      }
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
        timeManagement: 45
      }
    }
  ];

  const topicsData = [
    {
      id: "bst",
      name: "Binary Search Trees",
      subject: "Data Structures",
      mastery: 52,
      status: "At Risk",
      color: "red",
      prereq: "Tree Traversal Invariants & Pointer Referencing",
      causalInsight: "Low accuracy is 82% caused by misunderstanding Inorder Traversal order, not BST logic itself."
    },
    {
      id: "rec",
      name: "Recursion & Stack Frames",
      subject: "Data Structures",
      mastery: 68,
      status: "Developing",
      color: "yellow",
      prereq: "Call Stack Mechanics",
      causalInsight: "Repeated base-case boundary errors propagate into 3 downstream algorithmic topics."
    },
    {
      id: "sql",
      name: "SQL Joins & Indexing",
      subject: "DBMS",
      mastery: 84,
      status: "Strong",
      color: "green",
      prereq: "Relational Algebra",
      causalInsight: "Solid foundational grasp of set operations ensures consistent high score across join types."
    },
    {
      id: "sched",
      name: "Process Scheduling",
      subject: "Operating Systems",
      mastery: 73,
      status: "Developing",
      color: "yellow",
      prereq: "Queue Data Structures & Preemption Invariants",
      causalInsight: "Slight drop when context-switch overheads are introduced under multi-level queues."
    },
    {
      id: "dp",
      name: "Dynamic Programming",
      subject: "Algorithms",
      mastery: 44,
      status: "At Risk",
      color: "red",
      prereq: "Recursion & Overlapping Subproblems",
      causalInsight: "Root cause is poor recursive tree visualization; memorizing DP tables yields 0 transferability."
    },
    {
      id: "mem",
      name: "Virtual Memory & Paging",
      subject: "Operating Systems",
      mastery: 62,
      status: "Developing",
      color: "yellow",
      prereq: "Memory Addressing & TLB Mechanics",
      causalInsight: "Page replacement algorithm errors stem from misunderstanding LRU hardware bit tracking."
    }
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
      type: "Prerequisite Gap Fix"
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
      type: "Foundational Repair"
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
      type: "Time-Pressure Calibration"
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
      type: "Root-Cause Intervention"
    }
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
      diagnosis: "Prerequisite Gap: Inorder Invariant error caused 4 out of 5 missed questions."
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
      diagnosis: "High mastery. Minor slip on NULL handling in LEFT OUTER JOIN."
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
      diagnosis: "Gantt chart calculation errors during preemptive priority changes."
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
      diagnosis: "Causal Gap: Missing return statement in recursive accumulator branches."
    }
  ];

  // Causal Knowledge Graph Nodes (SIH Core Model)
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
      downstream: ["node-traversal", "node-bst"],
      evidence: "Failed 4 pointer re-linking sub-steps across Quiz #101 & #104."
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
      downstream: ["node-traversal", "node-dp"],
      evidence: "Stack overflow simulation missed on deep recursion depth test."
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
      downstream: ["node-bst", "node-avl"],
      parents: ["node-ptr", "node-rec"],
      evidence: "Misidentified sorted order retrieval sequence in 3 consecutive quizzes."
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
      parents: ["node-traversal", "node-ptr"],
      downstream: ["node-avl"],
      evidence: "Student repeatedly practices BST deletion but fails because Inorder Successor concept is missing."
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
      parents: ["node-bst", "node-traversal"],
      evidence: "Direct consequence of pointer confusion + traversal blindness."
    },
    "node-dp": {
      id: "node-dp",
      name: "Dynamic Programming",
      category: "Advanced Exam Topic",
      stage: 3,
      mastery: 44,
      status: "symptom",
      statusLabel: "Symptomatic Failure",
      causalInfluence: "Exam Topic (12 Marks)",
      description: "Overlapping subproblems and state transition recurrence relations.",
      parents: ["node-rec"],
      evidence: "Cannot formulate state recurrence because recursion mental model is flawed."
    }
  };

  // Practice Quiz Questions
  const practiceQuestions = [
    {
      id: 1,
      tag: "CORE PREREQUISITE • TREE INVARIANTS",
      question: "Which tree traversal of a Binary Search Tree (BST) is guaranteed to produce values in strictly ascending sorted order?",
      options: [
        "Preorder Traversal (Root, Left, Right)",
        "Inorder Traversal (Left, Root, Right)",
        "Postorder Traversal (Left, Right, Root)",
        "Level-Order (Breadth First Search)"
      ],
      correct: 1,
      explanation: "In a valid BST, for any node N, all values in its left subtree are < N, and all values in its right subtree are > N. Thus Inorder traversal (Left, then Root, then Right) processes nodes in ascending order.",
      causalNote: "Understanding this is the critical prerequisite before solving BST insertion, deletion, or range search problems."
    },
    {
      id: 2,
      tag: "COMMON MISTAKE PATTERN • NODE MUTATION",
      question: "During BST node deletion, when the node to be removed has two children, which node is swapped with it to preserve the BST invariant?",
      options: [
        "The root node of the entire tree",
        "The Inorder Predecessor or Inorder Successor",
        "The right child directly, discarding the left child",
        "Any randomly selected leaf node"
      ],
      correct: 1,
      explanation: "The Inorder Successor (the smallest value in the right subtree) or Inorder Predecessor (the largest value in the left subtree) is strictly greater than all left descendants and smaller than all right descendants, perfectly preserving the BST property.",
      causalNote: "Students who score low here usually fail because they memorize deletion steps without understanding Inorder traversal ordering."
    },
    {
      id: 3,
      tag: "COMPLEXITY ANALYSIS • PREREQUISITE",
      question: "What is the worst-case time complexity of searching in an unbalanced degenerate (skewed) Binary Search Tree with N nodes?",
      options: [
        "O(1)",
        "O(log N)",
        "O(N)",
        "O(N log N)"
      ],
      correct: 2,
      explanation: "In the worst case (e.g. inserting elements already in sorted order 1, 2, 3, ...), the BST degenerates into a single linked list, resulting in O(N) search time.",
      causalNote: "This exact limitation is the causal motivation for introducing Self-Balancing Trees (AVL / Red-Black Trees)."
    }
  ];

  // Active App State
  const state = {
    activePage: "Dashboard",
    currentStudentIndex: 0,
    searchQuery: "",
    selectedCausalNode: "node-traversal",
    simulatedPrereqMastery: 48,
    activeGapFilter: "all",
    notificationOpen: false,
    selectedWhyRec: null,
    selectedEvidenceTopic: null,
    practiceStarted: false,
    currentQuestionIdx: 0,
    userAnswers: {},
    quizSubmitted: false,
    mobileMenuOpen: false
  };

  // Helper to get active student
  function getStudent() {
    return students[state.currentStudentIndex];
  }

  // ==========================================
  // 2. SVG ICON GENERATORS (Crisp, Zero CDN)
  // ==========================================
  const icons = {
    dashboard: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
    brain: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v14"/></svg>',
    target: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    chart: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
    book: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>',
    network: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>',
    lightbulb: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
    sparkles: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
    bell: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    arrowRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    arrowUpRight: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>',
    chevronRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    alert: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
    clock: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    play: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>',
    trending: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    help: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
    user: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    close: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>'
  };

  // Navigation Items
  const navItems = [
    { name: "Dashboard", icon: icons.dashboard },
    { name: "Causal Analysis", icon: icons.brain, badge: "SIH 210" },
    { name: "Knowledge Gaps", icon: icons.network },
    { name: "Quiz Performance", icon: icons.chart },
    { name: "Practice Center", icon: icons.book },
    { name: "Recommendations", icon: icons.lightbulb, count: 4 },
    { name: "Exam Readiness", icon: icons.target },
    { name: "Student Profile", icon: icons.user }
  ];

  // ==========================================
  // 3. RENDER CORE STRUCTURE
  // ==========================================
  function renderApp() {
    const root = document.getElementById("root");
    if (!root) return;

    const student = getStudent();

    root.innerHTML = `
      <div class="app">
        <!-- Topbar -->
        <header class="topbar">
          <div class="brand" id="brand-home">
            <div class="logo">
              ${icons.brain}
            </div>
            <div>
              <h2>CausalGap <span class="brand-badge">SIH 210</span></h2>
              <span>Learn the cause, not just the mistake.</span>
            </div>
          </div>

          <div class="searchBox">
            ${icons.search}
            <input 
              type="text" 
              id="global-search-input" 
              placeholder="Search topics, causal chains, quizzes (e.g. BST)..." 
              value="${escapeHtml(state.searchQuery)}"
            />
            <kbd>⌘ K</kbd>
            <div id="search-dropdown-container"></div>
          </div>

          <div class="topActions">
            <button class="iconBtn" id="bell-btn" title="Learning Alerts">
              ${icons.bell}
              <span class="notificationBadge"></span>
            </button>
            <div id="notifications-dropdown-container"></div>

            <div class="avatar" id="avatar-toggle" title="Switch Student Profile">
              ${escapeHtml(student.avatar)}
            </div>

            <button class="mobileBtn" id="mobile-menu-btn" title="Toggle Navigation">
              ${state.mobileMenuOpen ? icons.close : icons.menu}
            </button>
          </div>
        </header>

        <!-- Main Layout -->
        <div class="layout">
          <!-- Sidebar -->
          <aside class="sidebar ${state.mobileMenuOpen ? 'open' : ''}">
            <div class="menuLabel">WORKSPACE</div>

            ${navItems.map(item => `
              <button 
                class="navItem ${state.activePage === item.name ? 'active' : ''}" 
                data-page="${item.name}"
              >
                ${item.icon}
                <span>${item.name}</span>
                ${item.count ? `<b class="count">${item.count}</b>` : ''}
                ${item.badge ? `<span style="font-size:0.65rem; background:#e0e7ff; color:#4338ca; padding:2px 6px; border-radius:4px; font-weight:700; margin-left:auto;">${item.badge}</span>` : ''}
              </button>
            `).join('')}

            <div class="sidebarBottom">
              <div class="miniCard">
                <strong>${icons.sparkles} ${student.streak} day streak</strong>
                <span>Causal reasoning pace active</span>
              </div>

              <button class="profile" id="sidebar-profile-btn">
                <div class="avatar small">${escapeHtml(student.avatar)}</div>
                <div>
                  <strong>${escapeHtml(student.name)}</strong>
                  <span>${escapeHtml(student.program)}</span>
                </div>
                ${icons.chevronRight}
              </button>
            </div>
          </aside>

          <!-- Main Content View -->
          <main class="main" id="main-content">
            ${renderCurrentView()}
          </main>
        </div>

        <!-- Modals Container -->
        <div id="modal-container">
          ${renderActiveModal()}
        </div>
      </div>
    `;

    attachEventListeners();
  }

  // ==========================================
  // 4. VIEW ROUTER
  // ==========================================
  function renderCurrentView() {
    switch (state.activePage) {
      case "Dashboard":
        return renderDashboard();
      case "Causal Analysis":
        return renderCausalAnalysis();
      case "Knowledge Gaps":
        return renderKnowledgeGaps();
      case "Quiz Performance":
        return renderQuizPerformance();
      case "Practice Center":
        return renderPracticeCenter();
      case "Recommendations":
        return renderRecommendations();
      case "Exam Readiness":
        return renderExamReadiness();
      case "Student Profile":
        return renderStudentProfile();
      default:
        return renderDashboard();
    }
  }

  // ==========================================
  // 5. VIEW: DASHBOARD (HOME)
  // ==========================================
  function renderDashboard() {
    const student = getStudent();
    return `
      <!-- Page Header -->
      <div class="pageHeader">
        <div>
          <div class="eyebrow">ACADEMIC DIAGNOSTIC SUITE • SEMESTER 6</div>
          <h1>Good evening, ${escapeHtml(student.name.split(' ')[0])} 👋</h1>
          <p>Here is your causal knowledge graph diagnostic before the upcoming exams.</p>
        </div>
        <button class="primaryBtn" id="btn-start-practice-dash">
          ${icons.play}
          Start Targeted Practice
        </button>
      </div>

      <!-- SIH 210 Core Innovation Banner -->
      <section class="sihBanner">
        <div class="sihBannerContent">
          <div class="sihBannerTag">${icons.brain} SIH Problem Statement 210 Feature</div>
          <h3>Causal Knowledge Gap Engine Active</h3>
          <p>
            Unlike naive platforms that correlate <em>"low score = weak topic"</em> and force brute-force drilling, 
            <strong>CausalGap</strong> traces your mistakes upstream to root-cause prerequisite bottlenecks. 
            Fix the root cause, unlock multiple exam topics at once!
          </p>
        </div>
        <button class="sihBannerBtn" id="btn-explore-causal">
          Explore Causal Chain ${icons.arrowRight}
        </button>
      </section>

      <!-- Key Diagnostic Stats -->
      <section class="stats">
        <div class="statCard">
          <div class="statTop">
            <span>Overall Concept Mastery</span>
            <div class="statIcon">${icons.brain}</div>
          </div>
          <strong>${student.mastery}%</strong>
          <small>${icons.trending} +6.4% this week</small>
        </div>

        <div class="statCard">
          <div class="statTop">
            <span>Root-Cause Gaps</span>
            <div class="statIcon danger">${icons.alert}</div>
          </div>
          <strong>${student.topicsAtRisk}</strong>
          <small style="color:var(--danger)">Affecting 5 exam topics</small>
        </div>

        <div class="statCard">
          <div class="statTop">
            <span>Exam Readiness Index</span>
            <div class="statIcon success">${icons.target}</div>
          </div>
          <strong>${student.readiness}%</strong>
          <small>${icons.trending} Target: 85%+</small>
        </div>

        <div class="statCard">
          <div class="statTop">
            <span>Study Hours Saved</span>
            <div class="statIcon">${icons.clock}</div>
          </div>
          <strong>${student.studyHoursSaved}</strong>
          <small class="subtle">Avoided repetitive drilling</small>
        </div>
      </section>

      <!-- Dashboard 2-Column Grid -->
      <div class="dashboardGrid">
        <!-- Learning Signals -->
        <section class="panel">
          <div class="panelTitle">
            <div>
              <h3>Causal Learning Signals</h3>
              <p>Automated causal discovery from recent quiz activity</p>
            </div>
            <button class="textBtn" data-nav="Causal Analysis">
              Full Graph ${icons.chevronRight}
            </button>
          </div>

          <div class="signalList">
            <div class="signal danger">
              <div class="signalIcon">${icons.alert}</div>
              <div>
                <strong>Prerequisite Bottleneck Detected</strong>
                <p>Tree Traversal Invariants error is the true root cause behind 84% of Binary Search Tree and AVL failures.</p>
              </div>
            </div>

            <div class="signal warning">
              <div class="signalIcon">${icons.network}</div>
              <div>
                <strong>Multi-Topic Propagation</strong>
                <p>Recursion Call Stack confusion is currently blocking progress in Dynamic Programming and Divide-and-Conquer.</p>
              </div>
            </div>

            <div class="signal success">
              <div class="signalIcon">${icons.check}</div>
              <div>
                <strong>Root Cause Resolved: SQL Relations</strong>
                <p>Mastering Relational Algebra improved your complex SQL join accuracy from 64% to 84%.</p>
              </div>
            </div>

            <div class="signal info">
              <div class="signalIcon">${icons.clock}</div>
              <div>
                <strong>Time-Pressure Behavioral Slip</strong>
                <p>Performance drops by 19% on multi-step questions under 60-second timers despite high theoretical mastery.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Exam Readiness Snapshot -->
        <section class="panel readiness">
          <div class="panelTitle">
            <div>
              <h3>Exam Readiness</h3>
              <p>Multi-dimensional readiness breakdown</p>
            </div>
          </div>

          <div class="readinessCircle" style="--readiness-val: ${student.readiness}">
            <div>
              <strong>${student.readiness}%</strong>
              <span>Ready</span>
            </div>
          </div>

          <div class="readinessRows">
            <div class="progressRow">
              <div><span>Concept Mastery</span><b>${student.subMetrics.conceptMastery}%</b></div>
              <div class="bar"><span style="width: ${student.subMetrics.conceptMastery}%"></span></div>
            </div>
            <div class="progressRow">
              <div><span>Prerequisite Coverage</span><b>${student.subMetrics.prerequisiteCoverage}%</b></div>
              <div class="bar warning"><span style="width: ${student.subMetrics.prerequisiteCoverage}%"></span></div>
            </div>
            <div class="progressRow">
              <div><span>Consistency</span><b>${student.subMetrics.consistency}%</b></div>
              <div class="bar"><span style="width: ${student.subMetrics.consistency}%"></span></div>
            </div>
            <div class="progressRow">
              <div><span>Time Management</span><b>${student.subMetrics.timeManagement}%</b></div>
              <div class="bar danger"><span style="width: ${student.subMetrics.timeManagement}%"></span></div>
            </div>
          </div>

          <button class="outlineBtn" data-nav="Exam Readiness" style="margin-top:auto;">
            View Detailed Breakdown ${icons.arrowUpRight}
          </button>
        </section>
      </div>

      <!-- Topics Needing Attention -->
      <section class="panel">
        <div class="panelTitle">
          <div>
            <h3>Topic Performance & Prerequisite Links</h3>
            <p>Topics prioritized by causal severity rather than simple percentage</p>
          </div>
          <button class="textBtn" data-nav="Knowledge Gaps">
            View All Topics ${icons.chevronRight}
          </button>
        </div>

        <div class="topicGrid">
          ${topicsData.slice(0, 4).map(topic => `
            <div class="topicCard">
              <div class="topicTop">
                <div class="topicDot ${topic.color}"></div>
                <span class="status ${topic.color}">${topic.status}</span>
              </div>
              <h4>${escapeHtml(topic.name)}</h4>
              <span class="subject">${escapeHtml(topic.subject)}</span>
              
              <div class="topicScore">
                <strong>${topic.mastery}%</strong>
                <span>mastery score</span>
              </div>
              <div class="bar ${topic.color === 'red' ? 'danger' : topic.color === 'yellow' ? 'warning' : 'success'}">
                <span style="width: ${topic.mastery}%"></span>
              </div>

              <p style="font-size:0.75rem; color:var(--subtext); margin-top:4px;">
                <strong>Causal Link:</strong> ${escapeHtml(topic.prereq)}
              </p>

              <button class="topicLink" data-topic-evidence="${topic.id}">
                Inspect Evidence ${icons.arrowUpRight}
              </button>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- High Priority Recommendations -->
      <section class="panel">
        <div class="panelTitle">
          <div>
            <h3>Causal-Directed Action Items</h3>
            <p>Targeted interventions designed to eliminate upstream knowledge bottlenecks</p>
          </div>
          <button class="textBtn" data-nav="Recommendations">
            All Recommendations ${icons.chevronRight}
          </button>
        </div>

        <div class="recommendationGrid">
          ${recommendationsList.slice(0, 3).map(rec => `
            <div class="recCard">
              <div class="recIcon">${icons.brain}</div>
              <div class="recContent">
                <div class="recHeader">
                  <span class="priority ${rec.priority.toLowerCase()}">${rec.priority} Priority</span>
                  <span class="confidence">${rec.confidence}% confidence</span>
                </div>
                <h4>${escapeHtml(rec.title)}</h4>
                <p>${escapeHtml(rec.reason)}</p>
                <div class="recCausalBadge">
                  ${icons.sparkles} ${escapeHtml(rec.downstreamBenefit)}
                </div>
                <div class="recActions">
                  <button class="primarySmall" data-start-rec="${rec.id}">
                    Start ${icons.arrowUpRight}
                  </button>
                  <button class="whyBtn" data-why-rec="${rec.id}">
                    ${icons.help} Why this?
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // ==========================================
  // 6. VIEW: CAUSAL ANALYSIS (THE SIH HERO)
  // ==========================================
  function renderCausalAnalysis() {
    const selectedNode = causalNodes[state.selectedCausalNode] || causalNodes["node-traversal"];
    const simVal = state.simulatedPrereqMastery;
    
    // Dynamic counterfactual calculation
    const baseBST = 52;
    const baseAVL = 34;
    const baseReadiness = 68;
    const delta = simVal - 48; // Baseline mastery of Traversal is 48%
    const predictedBST = Math.min(96, Math.max(30, Math.round(baseBST + delta * 0.65)));
    const predictedAVL = Math.min(94, Math.max(20, Math.round(baseAVL + delta * 0.58)));
    const predictedReadiness = Math.min(98, Math.max(45, Math.round(baseReadiness + delta * 0.32)));
    const predictedHours = Math.max(1.5, (14.5 - (delta * 0.15)).toFixed(1));

    return `
      <div class="pageHeader">
        <div>
          <div class="eyebrow">SMART INDIA HACKATHON 2024 • PROBLEM STATEMENT 210</div>
          <h1>Causal Knowledge Gap Engine</h1>
          <p>Distinguishing true causal root causes from mere correlation to deliver high-yield interventions.</p>
        </div>
        <div style="display:flex; gap:10px;">
          <button class="outlineBtn" id="btn-reset-simulation">
            Reset Baseline
          </button>
          <button class="primaryBtn" id="btn-run-sim-quiz">
            ${icons.play} Test Prerequisite
          </button>
        </div>
      </div>

      <!-- Core SIH Principle: Correlation vs Causality -->
      <div class="causalComparisonCard">
        <div class="comparisonBox bad">
          <div class="comparisonBoxHeader">
            <span style="color:var(--danger);">${icons.close}</span>
            <h4>Traditional Correlation-Based EdTech (Misleading)</h4>
          </div>
          <p>
            Observes: <em>"Student scored 50% on Binary Search Trees and 34% on AVL Trees."</em><br/>
            Correlation conclusion: <em>"Student is bad at Trees. Prescribe 50 random tree practice questions."</em>
          </p>
          <div class="exampleChain" style="color: #991b1b;">
            <strong>Flaw:</strong> The student wastes 12 hours practicing complex AVL rotations while remaining blind to 
            the unaddressed pointer and traversal misconceptions underneath.
          </div>
        </div>

        <div class="comparisonBox good">
          <div class="comparisonBoxHeader">
            <span style="color:var(--success);">${icons.check}</span>
            <h4>Causal Reasoning Model (SIH Problem Statement 210)</h4>
          </div>
          <p>
            Traces the Structural Causal Model (DAG):<br/>
            <code>Memory Concepts → Inorder Traversal Invariants → BST Deletions → AVL Rotations</code>
          </p>
          <div class="exampleChain" style="color: #166534;">
            <strong>Causal Insight:</strong> Intervening on the <strong>Inorder Traversal Invariant</strong> 
            directly resolves 84% of downstream BST mistakes in just 1.5 hours of targeted learning!
          </div>
        </div>
      </div>

      <!-- Interactive Causal Directed Acyclic Graph (DAG) -->
      <section class="causalGraphContainer">
        <div class="causalGraphToolbar">
          <div>
            <h3 style="font-size:1.15rem; font-weight:700;">Interactive Causal Prerequisite Graph (DAG)</h3>
            <p style="font-size:0.82rem; color:var(--subtext);">Click any concept node to inspect its causal dependencies and failure mechanisms</p>
          </div>

          <div class="causalLegend">
            <div class="legendItem">
              <span class="legendDot" style="background:#ef4444;"></span>
              <span>Root Cause Gap</span>
            </div>
            <div class="legendItem">
              <span class="legendDot" style="background:#f59e0b;"></span>
              <span>Prerequisite Bottleneck</span>
            </div>
            <div class="legendItem">
              <span class="legendDot" style="background:#10b981;"></span>
              <span>Developing / Mastered</span>
            </div>
          </div>
        </div>

        <!-- 3-Stage Visual Causal Chain -->
        <div class="causalChainVisual">
          <!-- Stage 1 -->
          <div class="causalStage">
            <div class="causalStageHeader">
              <span>Stage 1: Foundational Roots</span>
              <span style="font-size:0.7rem; color:var(--primary);">Prerequisites</span>
            </div>

            <div 
              class="causalNode ${state.selectedCausalNode === 'node-ptr' ? 'selected' : ''} rootCause"
              data-node-id="node-ptr"
            >
              <div class="causalNodeHeader">
                <span class="causalNodeTitle">Memory & Pointers</span>
                <span class="causalNodeBadge root">Root Cause</span>
              </div>
              <div class="causalNodeMetric">
                <span>Mastery: 44%</span>
                <b style="color:var(--danger)">89% Causal Wt.</b>
              </div>
              <div class="bar danger"><span style="width:44%"></span></div>
              <p class="causalNodeDetail" style="margin-top:6px;">
                Pointer dereferencing errors propagate into all dynamic data structures.
              </p>
            </div>

            <div 
              class="causalNode ${state.selectedCausalNode === 'node-rec' ? 'selected' : ''}"
              data-node-id="node-rec"
            >
              <div class="causalNodeHeader">
                <span class="causalNodeTitle">Call Stack Recursion</span>
                <span class="causalNodeBadge symptom">Developing</span>
              </div>
              <div class="causalNodeMetric">
                <span>Mastery: 66%</span>
                <b>74% Causal Wt.</b>
              </div>
              <div class="bar warning"><span style="width:66%"></span></div>
              <p class="causalNodeDetail" style="margin-top:6px;">
                Base-case returns and recursion frame unwinding mechanics.
              </p>
            </div>
          </div>

          <!-- Connector -->
          <div class="causalConnector">
            ${icons.arrowRight}
          </div>

          <!-- Stage 2 -->
          <div class="causalStage">
            <div class="causalStageHeader">
              <span>Stage 2: Core Invariants</span>
              <span style="font-size:0.7rem; color:var(--warning);">Bottleneck</span>
            </div>

            <div 
              class="causalNode ${state.selectedCausalNode === 'node-traversal' ? 'selected' : ''} symptom"
              data-node-id="node-traversal"
            >
              <div class="causalNodeHeader">
                <span class="causalNodeTitle">Tree Traversal Invariants</span>
                <span class="causalNodeBadge symptom">Bottleneck</span>
              </div>
              <div class="causalNodeMetric">
                <span>Mastery: 48%</span>
                <b style="color:var(--warning)">92% Causal Wt.</b>
              </div>
              <div class="bar warning"><span style="width:48%"></span></div>
              <p class="causalNodeDetail" style="margin-top:6px;">
                Inorder sequence preservation. Direct parent to BST Deletion & Search.
              </p>
            </div>
          </div>

          <!-- Connector -->
          <div class="causalConnector">
            ${icons.arrowRight}
          </div>

          <!-- Stage 3 -->
          <div class="causalStage">
            <div class="causalStageHeader">
              <span>Stage 3: Exam Target Topics</span>
              <span style="font-size:0.7rem; color:var(--text);">Symptomatic Failure</span>
            </div>

            <div 
              class="causalNode ${state.selectedCausalNode === 'node-bst' ? 'selected' : ''} symptom"
              data-node-id="node-bst"
            >
              <div class="causalNodeHeader">
                <span class="causalNodeTitle">BST Operations</span>
                <span class="causalNodeBadge symptom">Symptom</span>
              </div>
              <div class="causalNodeMetric">
                <span>Quiz Score: 52%</span>
                <span>8 Marks</span>
              </div>
              <div class="bar danger"><span style="width:52%"></span></div>
              <p class="causalNodeDetail" style="margin-top:6px;">
                Symptoms observed: Two-child deletions and successor replacements failed.
              </p>
            </div>

            <div 
              class="causalNode ${state.selectedCausalNode === 'node-avl' ? 'selected' : ''} rootCause"
              data-node-id="node-avl"
            >
              <div class="causalNodeHeader">
                <span class="causalNodeTitle">AVL Tree Rotations</span>
                <span class="causalNodeBadge root">Severe</span>
              </div>
              <div class="causalNodeMetric">
                <span>Quiz Score: 34%</span>
                <span>10 Marks</span>
              </div>
              <div class="bar danger"><span style="width:34%"></span></div>
              <p class="causalNodeDetail" style="margin-top:6px;">
                Double rotation balance preservation fails due to upstream traversal gap.
              </p>
            </div>
          </div>
        </div>

        <!-- Node Detail Inspector Box -->
        <div style="margin-top:1.5rem; background:var(--surface-alt); border-radius:var(--radius-md); padding:1.25rem; border:1px solid var(--border);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <h4 style="font-size:1.05rem; font-weight:700;">
              Active Concept Inspector: <span style="color:var(--primary);">${escapeHtml(selectedNode.name)}</span>
            </h4>
            <span class="gapTypeBadge ${selectedNode.status === 'rootCause' ? 'root' : 'prereq'}">
              ${escapeHtml(selectedNode.statusLabel)}
            </span>
          </div>
          <p style="font-size:0.88rem; color:var(--subtext); line-height:1.45;">
            ${escapeHtml(selectedNode.description)}
          </p>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin-top:12px; font-size:0.82rem;">
            <div>
              <strong style="color:var(--text);">Causal Attribution:</strong>
              <div style="color:var(--primary); font-weight:700; font-size:1rem; margin-top:2px;">
                ${escapeHtml(selectedNode.causalInfluence)}
              </div>
            </div>
            <div>
              <strong style="color:var(--text);">Identified Error Pattern:</strong>
              <div style="color:var(--subtext); margin-top:2px;">
                ${escapeHtml(selectedNode.evidence)}
              </div>
            </div>
            <div>
              <strong style="color:var(--text);">Actionable Next Step:</strong>
              <div style="color:var(--success); font-weight:600; margin-top:2px;">
                Targeted Micro-Practice (20 mins)
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Counterfactual "What-If" Intervention Simulator -->
      <section class="interventionBox">
        <div class="interventionHeader">
          <h4>${icons.sparkles} Counterfactual "What-If" Intervention Simulator</h4>
          <span style="font-size:0.75rem; background:#dbeafe; color:#1e40af; padding:4px 8px; border-radius:4px; font-weight:700;">
            Pearl's Structural Causal Inference Simulation
          </span>
        </div>

        <p style="font-size:0.86rem; color:#334155; line-height:1.45;">
          Test the causal hypothesis: <em>"If we intervene on the prerequisite concept <strong>Tree Traversal Invariants</strong> (do(Prereq = X%)), how do downstream exam topics and overall exam readiness respond?"</em>
        </p>

        <div class="sliderContainer">
          <div class="sliderLabels">
            <span>Prerequisite Mastery Intervention:</span>
            <span style="color:var(--primary); font-size:1rem; font-weight:800;" id="slider-display-val">
              ${simVal}% ${simVal > 48 ? `(+${simVal - 48}% boost)` : ''}
            </span>
          </div>
          <input 
            type="range" 
            min="30" 
            max="100" 
            value="${simVal}" 
            class="interventionSlider" 
            id="intervention-slider"
          />
          <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:var(--subtext);">
            <span>Low (30%)</span>
            <span>Current Baseline (48%)</span>
            <span>Mastery Goal (90%+)</span>
          </div>
        </div>

        <div class="simulationOutcomeGrid">
          <div class="outcomeCard">
            <span>Predicted BST Mastery</span>
            <strong style="color: ${predictedBST >= 70 ? 'var(--success)' : 'var(--danger)'}">
              ${predictedBST}%
            </strong>
            <small>${predictedBST >= baseBST ? `+${predictedBST - baseBST}% gain` : `${predictedBST - baseBST}% drop`}</small>
          </div>

          <div class="outcomeCard">
            <span>Predicted AVL Trees</span>
            <strong style="color: ${predictedAVL >= 60 ? 'var(--success)' : 'var(--warning)'}">
              ${predictedAVL}%
            </strong>
            <small>${predictedAVL >= baseAVL ? `+${predictedAVL - baseAVL}% gain` : `${predictedAVL - baseAVL}% drop`}</small>
          </div>

          <div class="outcomeCard">
            <span>Predicted Exam Readiness</span>
            <strong style="color: var(--primary);">
              ${predictedReadiness}%
            </strong>
            <small>${predictedReadiness >= baseReadiness ? `+${predictedReadiness - baseReadiness}% overall` : `${predictedReadiness - baseReadiness}% overall`}</small>
          </div>

          <div class="outcomeCard">
            <span>Required Study Time</span>
            <strong style="color: #059669;">
              ${predictedHours} hrs
            </strong>
            <small>65% faster than naive drill</small>
          </div>
        </div>
      </section>
    `;
  }

  // ==========================================
  // 7. VIEW: KNOWLEDGE GAPS ANALYSIS
  // ==========================================
  function renderKnowledgeGaps() {
    const gaps = [
      {
        concept: "Tree Traversal Invariants",
        subject: "Data Structures",
        type: "Prerequisite Gap",
        badge: "prereq",
        severity: "Critical",
        frequency: "4 errors / 3 quizzes",
        downstream: "Binary Search Trees, AVL Trees, Heaps",
        fixTime: "1.5 hrs"
      },
      {
        concept: "Pointer Referencing & Aliasing",
        subject: "Data Structures",
        type: "Root-Cause Gap",
        badge: "root",
        severity: "Severe",
        frequency: "6 errors / 4 quizzes",
        downstream: "Linked Lists, Tree Rotations, Graphs",
        fixTime: "1.0 hr"
      },
      {
        concept: "Recursion Stack Frame Unwinding",
        subject: "Algorithms",
        type: "Prerequisite Gap",
        badge: "prereq",
        severity: "High",
        frequency: "3 errors / 2 quizzes",
        downstream: "Dynamic Programming, Divide & Conquer",
        fixTime: "2.0 hrs"
      },
      {
        concept: "Process State Preemption Invariants",
        subject: "Operating Systems",
        type: "Conceptual Slip",
        badge: "slip",
        severity: "Moderate",
        frequency: "2 errors / 1 quiz",
        downstream: "Round Robin, Multilevel Feedback Queues",
        fixTime: "45 mins"
      },
      {
        concept: "SQL NULL Logic in Outer Joins",
        subject: "DBMS",
        type: "Edge-Case Slip",
        badge: "slip",
        severity: "Low",
        frequency: "1 error / 2 quizzes",
        downstream: "Complex Aggregation Queries",
        fixTime: "30 mins"
      }
    ];

    const filtered = gaps.filter(g => {
      if (state.activeGapFilter === "root") return g.badge === "root";
      if (state.activeGapFilter === "prereq") return g.badge === "prereq";
      if (state.activeGapFilter === "slip") return g.badge === "slip";
      return true;
    });

    return `
      <div class="pageHeader">
        <div>
          <div class="eyebrow">DIAGNOSTIC MATRIX</div>
          <h1>Knowledge Gap Analysis</h1>
          <p>Differentiating upstream root causes from surface symptoms across all subjects.</p>
        </div>
        <button class="primaryBtn" id="btn-export-gaps">
          ${icons.chart} Generate Diagnostic Report
        </button>
      </div>

      <section class="panel">
        <div class="gapFilterBar">
          <div class="filterTabs">
            <button class="filterTab ${state.activeGapFilter === 'all' ? 'active' : ''}" data-gap-filter="all">
              All Gaps (${gaps.length})
            </button>
            <button class="filterTab ${state.activeGapFilter === 'root' ? 'active' : ''}" data-gap-filter="root">
              Root-Cause (${gaps.filter(g => g.badge === 'root').length})
            </button>
            <button class="filterTab ${state.activeGapFilter === 'prereq' ? 'active' : ''}" data-gap-filter="prereq">
              Prerequisites (${gaps.filter(g => g.badge === 'prereq').length})
            </button>
            <button class="filterTab ${state.activeGapFilter === 'slip' ? 'active' : ''}" data-gap-filter="slip">
              Execution Slips (${gaps.filter(g => g.badge === 'slip').length})
            </button>
          </div>
          <span style="font-size:0.8rem; color:var(--subtext);">
            Showing ${filtered.length} diagnosed knowledge items
          </span>
        </div>

        <div style="overflow-x:auto;">
          <table class="gapTable">
            <thead>
              <tr>
                <th>Concept & Area</th>
                <th>Subject</th>
                <th>Causal Gap Classification</th>
                <th>Error Frequency</th>
                <th>Downstream Propagation</th>
                <th>Targeted Fix</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map(gap => `
                <tr>
                  <td>
                    <strong>${escapeHtml(gap.concept)}</strong>
                  </td>
                  <td>
                    <span style="font-size:0.82rem; color:var(--subtext);">${escapeHtml(gap.subject)}</span>
                  </td>
                  <td>
                    <span class="gapTypeBadge ${gap.badge}">
                      ${escapeHtml(gap.type)}
                    </span>
                  </td>
                  <td>
                    <span style="font-size:0.82rem; font-weight:600;">${escapeHtml(gap.frequency)}</span>
                  </td>
                  <td>
                    <span style="font-size:0.8rem; color:#475569;">${escapeHtml(gap.downstream)}</span>
                  </td>
                  <td>
                    <span style="font-size:0.82rem; font-weight:700; color:var(--primary);">${escapeHtml(gap.fixTime)}</span>
                  </td>
                  <td>
                    <button class="primarySmall" data-resolve-gap="${escapeHtml(gap.concept)}">
                      Resolve ${icons.arrowRight}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  // ==========================================
  // 8. VIEW: QUIZ PERFORMANCE & HISTORY
  // ==========================================
  function renderQuizPerformance() {
    return `
      <div class="pageHeader">
        <div>
          <div class="eyebrow">HISTORICAL EVALUATIONS</div>
          <h1>Past Quiz Performance</h1>
          <p>Review past assessment scores and the causal mistakes detected by the diagnostic engine.</p>
        </div>
        <button class="primaryBtn" data-nav="Practice Center">
          ${icons.play} Take New Practice Quiz
        </button>
      </div>

      <section class="panel">
        <div class="panelTitle">
          <div>
            <h3>Recent Assessments Log</h3>
            <p>Every quiz is analyzed to extract error patterns rather than just raw marks</p>
          </div>
        </div>

        <div style="overflow-x:auto;">
          <table class="gapTable">
            <thead>
              <tr>
                <th>Assessment Title</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Score</th>
                <th>Accuracy</th>
                <th>Causal Diagnosis Summary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${quizHistory.map(q => `
                <tr>
                  <td>
                    <strong>${escapeHtml(q.title)}</strong>
                  </td>
                  <td>
                    <span style="font-size:0.82rem; color:var(--subtext);">${escapeHtml(q.subject)}</span>
                  </td>
                  <td>
                    <span style="font-size:0.82rem; color:var(--subtext);">${escapeHtml(q.date)}</span>
                  </td>
                  <td>
                    <strong style="color: ${parseInt(q.score) >= 75 ? 'var(--success)' : 'var(--danger)'}">
                      ${escapeHtml(q.score)}
                    </strong>
                  </td>
                  <td>
                    <span style="font-size:0.82rem;">${q.correct} / ${q.total}</span>
                  </td>
                  <td>
                    <p style="font-size:0.8rem; color:#334155; max-width:320px; line-height:1.35;">
                      ${escapeHtml(q.diagnosis)}
                    </p>
                  </td>
                  <td>
                    <button class="outlineBtn" style="padding:4px 10px; font-size:0.78rem;" data-review-quiz="${q.id}">
                      Review Mistakes
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  // ==========================================
  // 9. VIEW: PRACTICE CENTER (INTERACTIVE QUIZ)
  // ==========================================
  function renderPracticeCenter() {
    if (!state.practiceStarted) {
      return `
        <div class="pageHeader">
          <div>
            <div class="eyebrow">DIAGNOSTIC TEST CENTER</div>
            <h1>Targeted Concept Practice</h1>
            <p>Interactive practice calibrated to test identified prerequisite bottlenecks.</p>
          </div>
        </div>

        <section class="panel" style="text-align:center; padding:3.5rem 1.5rem; max-width:720px; margin:0 auto;">
          <div style="width:64px; height:64px; border-radius:50%; background:var(--primary-light); color:var(--primary); display:grid; place-items:center; margin:0 auto 1.5rem;">
            ${icons.book}
          </div>
          <h2 style="font-size:1.6rem; font-weight:800; margin-bottom:8px;">Ready for Prerequisite Calibration?</h2>
          <p style="font-size:0.95rem; color:var(--subtext); max-width:500px; margin:0 auto 1.75rem; line-height:1.5;">
            This session directly targets <strong>Tree Traversal Invariants</strong> and <strong>BST Invariant Maintenance</strong> to repair the causal bottleneck discovered in Quiz #104.
          </p>
          <div style="display:flex; justify-content:center; gap:16px;">
            <button class="primaryBtn" id="btn-start-quiz-now" style="padding:12px 28px; font-size:1rem;">
              ${icons.play} Start 3-Question Diagnostic
            </button>
          </div>
        </section>
      `;
    }

    const q = practiceQuestions[state.currentQuestionIdx];
    const selectedAns = state.userAnswers[state.currentQuestionIdx];
    const isAnswered = selectedAns !== undefined;

    return `
      <div class="pageHeader">
        <div>
          <div class="eyebrow">DIAGNOSTIC QUIZ IN PROGRESS</div>
          <h1>Prerequisite Focus: Tree Invariants</h1>
          <p>Evaluating root-cause mental models in binary search structures.</p>
        </div>
        <div class="timer">
          ${icons.clock} 14:15 remaining
        </div>
      </div>

      <div class="quizPanel">
        <div class="quizProgress">
          <span>Question ${state.currentQuestionIdx + 1} of ${practiceQuestions.length}</span>
          <span>${Math.round(((state.currentQuestionIdx + 1) / practiceQuestions.length) * 100)}% Complete</span>
        </div>
        <div class="bar large">
          <span style="width: ${((state.currentQuestionIdx + 1) / practiceQuestions.length) * 100}%"></span>
        </div>

        <div class="question">
          <span class="questionTag">${q.tag}</span>
          <h2>${escapeHtml(q.question)}</h2>

          <div class="optionsList">
            ${q.options.map((opt, i) => {
              let optClass = "option";
              if (isAnswered) {
                if (i === q.correct) optClass += " correct";
                else if (i === selectedAns) optClass += " wrong";
              } else if (selectedAns === i) {
                optClass += " selected";
              }
              return `
                <button 
                  class="${optClass}" 
                  data-option-idx="${i}" 
                  ${isAnswered ? 'disabled' : ''}
                >
                  <span>${String.fromCharCode(65 + i)}</span>
                  ${escapeHtml(opt)}
                </button>
              `;
            }).join('')}
          </div>

          ${isAnswered ? `
            <div class="quizFeedback">
              <strong style="color: ${selectedAns === q.correct ? 'var(--success)' : 'var(--danger)'}; display:flex; align-items:center; gap:6px;">
                ${selectedAns === q.correct ? icons.check + ' Correct!' : icons.close + ' Concept Mistake Detected!'}
              </strong>
              <p style="font-size:0.85rem; color:var(--text); line-height:1.45;">
                ${escapeHtml(q.explanation)}
              </p>
              <div style="font-size:0.78rem; background:#eff6ff; color:#1e40af; padding:8px 12px; border-radius:6px; margin-top:4px;">
                <strong>Causal Diagnostic:</strong> ${escapeHtml(q.causalNote)}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="quizFooter">
          <button class="outlineBtn" id="btn-quit-quiz">
            Exit Quiz
          </button>
          
          ${state.currentQuestionIdx < practiceQuestions.length - 1 ? `
            <button 
              class="primaryBtn" 
              id="btn-next-question"
              ${!isAnswered ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}
            >
              Next Question ${icons.chevronRight}
            </button>
          ` : `
            <button 
              class="primaryBtn" 
              id="btn-finish-quiz"
              ${!isAnswered ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}
            >
              Complete Evaluation ${icons.check}
            </button>
          `}
        </div>
      </div>
    `;
  }

  // ==========================================
  // 10. VIEW: RECOMMENDATIONS
  // ==========================================
  function renderRecommendations() {
    return `
      <div class="pageHeader">
        <div>
          <div class="eyebrow">ACTIONABLE CURATION</div>
          <h1>Personalized Learning Recommendations</h1>
          <p>AI-driven recommendations prioritized to eliminate root-cause prerequisite gaps before your exam.</p>
        </div>
      </div>

      <section class="panel">
        <div class="recommendationGrid">
          ${recommendationsList.map(rec => `
            <div class="recCard">
              <div class="recIcon">${icons.brain}</div>
              <div class="recContent">
                <div class="recHeader">
                  <span class="priority ${rec.priority.toLowerCase()}">${rec.priority} Priority</span>
                  <span class="confidence">${rec.confidence}% confidence</span>
                </div>
                <h4>${escapeHtml(rec.title)}</h4>
                <p>${escapeHtml(rec.reason)}</p>

                <div style="margin-top:4px; font-size:0.75rem; color:var(--subtext);">
                  <strong>Estimated Time:</strong> ${escapeHtml(rec.timeEstimate)} • 
                  <strong>Focus:</strong> ${escapeHtml(rec.targetConcept)}
                </div>

                <div class="recCausalBadge">
                  ${icons.sparkles} ${escapeHtml(rec.downstreamBenefit)}
                </div>

                <div class="recActions">
                  <button class="primarySmall" data-start-rec="${rec.id}">
                    Start Learning ${icons.arrowUpRight}
                  </button>
                  <button class="whyBtn" data-why-rec="${rec.id}">
                    ${icons.help} Why this?
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // ==========================================
  // 11. VIEW: EXAM READINESS & PROGRESS
  // ==========================================
  function renderExamReadiness() {
    const student = getStudent();
    return `
      <div class="pageHeader">
        <div>
          <div class="eyebrow">BENCHMARK EVALUATION</div>
          <h1>Exam Readiness & Preparation Velocity</h1>
          <p>Comprehensive breakdown of syllabus confidence, prerequisite strength, and timing metrics.</p>
        </div>
        <div style="font-weight:700; background:#fef3c7; color:#92400e; padding:8px 14px; border-radius:8px; display:flex; align-items:center; gap:8px;">
          ${icons.clock} ${student.daysLeft} Days to ${escapeHtml(student.targetExam)}
        </div>
      </div>

      <div class="dashboardGrid">
        <section class="panel">
          <div class="panelTitle">
            <div>
              <h3>Readiness Vectors</h3>
              <p>Key indicators evaluated by the causal diagnostic model</p>
            </div>
          </div>

          <div class="readinessRows">
            <div class="progressRow">
              <div><span>Core Concept Mastery</span><b>${student.subMetrics.conceptMastery}%</b></div>
              <div class="bar large"><span style="width: ${student.subMetrics.conceptMastery}%"></span></div>
              <small style="font-size:0.75rem; color:var(--subtext);">Evaluates ability to correctly answer standard syllabus questions.</small>
            </div>

            <div class="progressRow" style="margin-top:10px;">
              <div><span>Prerequisite Tree Coverage</span><b>${student.subMetrics.prerequisiteCoverage}%</b></div>
              <div class="bar large warning"><span style="width: ${student.subMetrics.prerequisiteCoverage}%"></span></div>
              <small style="font-size:0.75rem; color:var(--warning);">Causal bottleneck: 39% of foundational concepts require reinforcement.</small>
            </div>

            <div class="progressRow" style="margin-top:10px;">
              <div><span>Problem-Solving Consistency</span><b>${student.subMetrics.consistency}%</b></div>
              <div class="bar large"><span style="width: ${student.subMetrics.consistency}%"></span></div>
              <small style="font-size:0.75rem; color:var(--subtext);">Variance in test accuracy across different question variations.</small>
            </div>

            <div class="progressRow" style="margin-top:10px;">
              <div><span>Time-Pressure Resilience</span><b>${student.subMetrics.timeManagement}%</b></div>
              <div class="bar large danger"><span style="width: ${student.subMetrics.timeManagement}%"></span></div>
              <small style="font-size:0.75rem; color:var(--danger);">Accuracy degrades significantly when timers drop under 60s.</small>
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panelTitle">
            <div>
              <h3>Exam Projected Score</h3>
              <p>Based on causal mastery vs traditional correlation</p>
            </div>
          </div>

          <div style="text-align:center; padding:1.5rem 0;">
            <div style="font-size:3rem; font-weight:800; color:var(--primary); line-height:1;">
              ${student.readiness} / 100
            </div>
            <span style="font-size:0.85rem; font-weight:700; color:var(--subtext); text-transform:uppercase; letter-spacing:0.05em;">
              Current Projected Mark
            </span>
          </div>

          <div style="background:var(--surface-alt); border-radius:var(--radius-md); padding:1rem; font-size:0.82rem; line-height:1.45;">
            <strong>Target Optimization:</strong>
            <p style="color:var(--subtext); margin-top:4px;">
              By completing the 2 high-priority causal prerequisite modules (2.5 hrs total), your projected exam mark increases from <strong>${student.readiness}%</strong> to <strong>82%</strong>.
            </p>
          </div>

          <button class="primaryBtn" style="width:100%; margin-top:1.25rem; justify-content:center;" data-nav="Causal Analysis">
            Launch Intervention Plan ${icons.arrowRight}
          </button>
        </section>
      </div>
    `;
  }

  // ==========================================
  // 12. VIEW: STUDENT PROFILE
  // ==========================================
  function renderStudentProfile() {
    const student = getStudent();
    return `
      <div class="pageHeader">
        <div>
          <div class="eyebrow">ACADEMIC IDENTITY</div>
          <h1>Student Diagnostic Profile</h1>
          <p>Inspect or switch between different student evaluation profiles for testing.</p>
        </div>
      </div>

      <div class="profileContainer">
        <!-- Profile Card -->
        <div class="profileCard">
          <div class="profileAvatarLg">${escapeHtml(student.avatar)}</div>
          <h2 style="font-size:1.35rem; font-weight:800;">${escapeHtml(student.name)}</h2>
          <span style="font-size:0.85rem; color:var(--primary); font-weight:600;">${escapeHtml(student.program)}</span>
          <span style="font-size:0.78rem; color:var(--subtext);">${escapeHtml(student.semester)}</span>

          <div class="profileMetaList">
            <div class="profileMetaItem">
              <span>Target Exam</span>
              <strong>${escapeHtml(student.targetExam)}</strong>
            </div>
            <div class="profileMetaItem">
              <span>Countdown</span>
              <strong style="color:var(--danger)">${student.daysLeft} days left</strong>
            </div>
            <div class="profileMetaItem">
              <span>Exam Readiness</span>
              <strong style="color:var(--primary)">${student.readiness}%</strong>
            </div>
            <div class="profileMetaItem">
              <span>Practice Streak</span>
              <strong>${student.streak} days</strong>
            </div>
          </div>
        </div>

        <!-- Student Switcher for SIH Evaluators -->
        <section class="panel">
          <div class="panelTitle">
            <div>
              <h3>Switch Evaluation Persona (SIH Demo Mode)</h3>
              <p>Simulate different student scenarios with distinct causal gap patterns</p>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            ${students.map((std, idx) => `
              <div 
                style="
                  display:flex; 
                  align-items:center; 
                  justify-content:space-between; 
                  padding:14px; 
                  border-radius:var(--radius-md); 
                  border:1.5px solid ${idx === state.currentStudentIndex ? 'var(--primary)' : 'var(--border)'};
                  background: ${idx === state.currentStudentIndex ? 'var(--primary-light)' : 'var(--surface)'};
                  cursor:pointer;
                "
                data-switch-student="${idx}"
              >
                <div style="display:flex; align-items:center; gap:12px;">
                  <div class="avatar">${escapeHtml(std.avatar)}</div>
                  <div>
                    <strong>${escapeHtml(std.name)}</strong>
                    <p style="font-size:0.78rem; color:var(--subtext);">
                      ${escapeHtml(std.program)} • Readiness: ${std.readiness}% • ${std.topicsAtRisk} Root Gaps
                    </p>
                  </div>
                </div>

                ${idx === state.currentStudentIndex ? `
                  <span style="font-size:0.75rem; background:var(--primary); color:#fff; padding:3px 8px; border-radius:4px; font-weight:700;">
                    Active
                  </span>
                ` : `
                  <button class="outlineBtn" style="padding:5px 12px; font-size:0.78rem;">
                    Select Persona
                  </button>
                `}
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  }

  // ==========================================
  // 13. MODALS (WHY? CAUSAL RATIONALE & EVIDENCE)
  // ==========================================
  function renderActiveModal() {
    if (state.selectedWhyRec) {
      const rec = recommendationsList.find(r => r.id === state.selectedWhyRec);
      if (!rec) return '';
      return `
        <div class="modalOverlay" id="modal-overlay">
          <div class="modalContent">
            <button class="modalCloseBtn" id="modal-close-btn">${icons.close}</button>
            <div style="display:inline-flex; align-items:center; gap:6px; background:#eff6ff; color:#1e40af; font-size:0.75rem; font-weight:700; padding:4px 10px; border-radius:4px; margin-bottom:10px;">
              ${icons.brain} Causal Attribution Engine Explanation
            </div>
            <h2 style="font-size:1.3rem; font-weight:800; margin-bottom:8px;">${escapeHtml(rec.title)}</h2>
            <p style="font-size:0.9rem; color:var(--subtext); line-height:1.5; margin-bottom:1.25rem;">
              ${escapeHtml(rec.reason)}
            </p>

            <div style="background:var(--surface-alt); border-radius:var(--radius-md); padding:1rem; border:1px solid var(--border); font-size:0.85rem; display:flex; flex-direction:column; gap:8px;">
              <div><strong>Root Cause Concept:</strong> <span style="color:var(--primary); font-weight:600;">${escapeHtml(rec.targetConcept)}</span></div>
              <div><strong>Confidence Score:</strong> ${rec.confidence}% (Calculated via Bayesian Causal Inference)</div>
              <div><strong>Downstream Yield:</strong> <span style="color:var(--success); font-weight:700;">${escapeHtml(rec.downstreamBenefit)}</span></div>
              <div><strong>Why not just practice more BST?</strong> Practicing BST directly without resolving this invariant creates negative transfer and reinforces faulty heuristics.</div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:1.5rem;">
              <button class="outlineBtn" id="modal-close-btn-2">Close</button>
              <button class="primaryBtn" id="modal-action-start" data-rec-id="${rec.id}">
                Start Guided Practice ${icons.arrowRight}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    if (state.selectedEvidenceTopic) {
      const topic = topicsData.find(t => t.id === state.selectedEvidenceTopic);
      if (!topic) return '';
      return `
        <div class="modalOverlay" id="modal-overlay">
          <div class="modalContent">
            <button class="modalCloseBtn" id="modal-close-btn">${icons.close}</button>
            <div class="eyebrow" style="margin-bottom:6px;">EMPIRICAL EVIDENCE LOG</div>
            <h2 style="font-size:1.35rem; font-weight:800; margin-bottom:6px;">${escapeHtml(topic.name)}</h2>
            <p style="font-size:0.88rem; color:var(--subtext); margin-bottom:1.25rem;">
              Subject: ${escapeHtml(topic.subject)} • Current Mastery: ${topic.mastery}%
            </p>

            <div style="background:#fef2f2; border-left:4px solid #ef4444; padding:12px; border-radius:4px; margin-bottom:1rem;">
              <strong style="color:#991b1b; font-size:0.88rem;">Causal Diagnosis:</strong>
              <p style="font-size:0.84rem; color:#7f1d1d; margin-top:4px;">
                ${escapeHtml(topic.causalInsight)}
              </p>
            </div>

            <div style="font-size:0.85rem; color:var(--text); line-height:1.5;">
              <p><strong>Causal Predecessors:</strong> ${escapeHtml(topic.prereq)}</p>
              <p style="margin-top:8px;">
                <strong>Historical Assessment Correlation:</strong> Across 3 evaluations, 72% of wrong responses were triggered by flawed prerequisite assumptions rather than syntax or execution bugs.
              </p>
            </div>

            <div style="display:flex; justify-content:flex-end; margin-top:1.5rem;">
              <button class="primaryBtn" id="modal-jump-causal">
                View in Causal DAG ${icons.arrowRight}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    return '';
  }

  // ==========================================
  // 14. EVENT LISTENERS & REACTIVITY
  // ==========================================
  function attachEventListeners() {
    // Navigation items
    document.querySelectorAll(".navItem, [data-nav]").forEach(el => {
      el.addEventListener("click", () => {
        const page = el.getAttribute("data-page") || el.getAttribute("data-nav");
        if (page) {
          state.activePage = page;
          state.mobileMenuOpen = false;
          renderApp();
        }
      });
    });

    // Brand logo click -> Home
    const brandHome = document.getElementById("brand-home");
    if (brandHome) {
      brandHome.addEventListener("click", () => {
        state.activePage = "Dashboard";
        renderApp();
      });
    }

    // Mobile menu toggle
    const mobileBtn = document.getElementById("mobile-menu-btn");
    if (mobileBtn) {
      mobileBtn.addEventListener("click", () => {
        state.mobileMenuOpen = !state.mobileMenuOpen;
        renderApp();
      });
    }

    // Avatar toggle -> Profile
    const avatarToggle = document.getElementById("avatar-toggle");
    if (avatarToggle) {
      avatarToggle.addEventListener("click", () => {
        state.activePage = "Student Profile";
        renderApp();
      });
    }

    const sidebarProfileBtn = document.getElementById("sidebar-profile-btn");
    if (sidebarProfileBtn) {
      sidebarProfileBtn.addEventListener("click", () => {
        state.activePage = "Student Profile";
        renderApp();
      });
    }

    // Banner button
    const btnExploreCausal = document.getElementById("btn-explore-causal");
    if (btnExploreCausal) {
      btnExploreCausal.addEventListener("click", () => {
        state.activePage = "Causal Analysis";
        renderApp();
      });
    }

    // Dashboard Start Practice button
    const btnStartPracticeDash = document.getElementById("btn-start-practice-dash");
    if (btnStartPracticeDash) {
      btnStartPracticeDash.addEventListener("click", () => {
        state.activePage = "Practice Center";
        state.practiceStarted = true;
        renderApp();
      });
    }

    // Search Box
    const searchInput = document.getElementById("global-search-input");
    const searchDropdown = document.getElementById("search-dropdown-container");
    if (searchInput && searchDropdown) {
      searchInput.addEventListener("input", (e) => {
        const q = e.target.value.trim().toLowerCase();
        state.searchQuery = e.target.value;
        if (!q) {
          searchDropdown.innerHTML = '';
          return;
        }

        const matchedTopics = topicsData.filter(t => t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q));
        const matchedRecs = recommendationsList.filter(r => r.title.toLowerCase().includes(q));

        if (matchedTopics.length === 0 && matchedRecs.length === 0) {
          searchDropdown.innerHTML = `
            <div class="searchDropdown">
              <div style="padding:8px 12px; font-size:0.82rem; color:var(--subtext);">No matching topics or causal gaps found.</div>
            </div>
          `;
          return;
        }

        searchDropdown.innerHTML = `
          <div class="searchDropdown">
            ${matchedTopics.map(t => `
              <div class="searchResultItem" data-search-topic="${t.id}">
                <div>
                  <strong>${escapeHtml(t.name)}</strong>
                  <span style="display:block; font-size:0.75rem; color:var(--subtext);">${escapeHtml(t.subject)}</span>
                </div>
                <span class="status ${t.color}">${t.status}</span>
              </div>
            `).join('')}
            ${matchedRecs.map(r => `
              <div class="searchResultItem" data-search-rec="${r.id}">
                <div>
                  <strong>${escapeHtml(r.title)}</strong>
                  <span style="display:block; font-size:0.75rem; color:var(--subtext);">${r.priority} Priority</span>
                </div>
                ${icons.arrowRight}
              </div>
            `).join('')}
          </div>
        `;

        searchDropdown.querySelectorAll("[data-search-topic]").forEach(item => {
          item.addEventListener("click", () => {
            state.activePage = "Knowledge Gaps";
            searchDropdown.innerHTML = '';
            renderApp();
          });
        });

        searchDropdown.querySelectorAll("[data-search-rec]").forEach(item => {
          item.addEventListener("click", () => {
            state.activePage = "Recommendations";
            searchDropdown.innerHTML = '';
            renderApp();
          });
        });
      });
    }

    // Bell Notifications
    const bellBtn = document.getElementById("bell-btn");
    const notificationsDropdown = document.getElementById("notifications-dropdown-container");
    if (bellBtn && notificationsDropdown) {
      bellBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        state.notificationOpen = !state.notificationOpen;
        if (state.notificationOpen) {
          notificationsDropdown.innerHTML = `
            <div class="notificationsMenu">
              <div class="notificationsHeader">
                <h4>Learning Alerts & Signals</h4>
                <span style="font-size:0.72rem; color:var(--primary); font-weight:700;">4 New</span>
              </div>
              <div class="notificationItem" data-nav="Causal Analysis">
                <strong>Tree Traversal Bottleneck</strong>
                <small>Causes 84% of errors in BST. Recommended fix available.</small>
              </div>
              <div class="notificationItem" data-nav="Exam Readiness">
                <strong>Readiness Updated</strong>
                <small>Overall readiness climbed +6% after SQL module completion.</small>
              </div>
              <div class="notificationItem" data-nav="Practice Center">
                <strong>18 Days Until Exam</strong>
                <small>Target: Complete prerequisite repairs before Friday.</small>
              </div>
            </div>
          `;
          notificationsDropdown.querySelectorAll(".notificationItem").forEach(item => {
            item.addEventListener("click", () => {
              const nav = item.getAttribute("data-nav");
              if (nav) {
                state.activePage = nav;
                state.notificationOpen = false;
                renderApp();
              }
            });
          });
        } else {
          notificationsDropdown.innerHTML = '';
        }
      });
    }

    // Causal DAG Node Selection
    document.querySelectorAll("[data-node-id]").forEach(nodeEl => {
      nodeEl.addEventListener("click", () => {
        const id = nodeEl.getAttribute("data-node-id");
        state.selectedCausalNode = id;
        renderApp();
      });
    });

    // Counterfactual Slider
    const slider = document.getElementById("intervention-slider");
    if (slider) {
      slider.addEventListener("input", (e) => {
        state.simulatedPrereqMastery = parseInt(e.target.value, 10);
        const displayVal = document.getElementById("slider-display-val");
        if (displayVal) {
          const delta = state.simulatedPrereqMastery - 48;
          displayVal.innerHTML = `${state.simulatedPrereqMastery}% ${delta > 0 ? `(+${delta}% boost)` : delta < 0 ? `(${delta}%)` : ''}`;
        }
        // Update simulation outcomes dynamically
        renderApp();
      });
    }

    // Reset Simulation
    const btnResetSim = document.getElementById("btn-reset-simulation");
    if (btnResetSim) {
      btnResetSim.addEventListener("click", () => {
        state.simulatedPrereqMastery = 48;
        renderApp();
      });
    }

    // Test Prerequisite Button in Causal View
    const btnRunSimQuiz = document.getElementById("btn-run-sim-quiz");
    if (btnRunSimQuiz) {
      btnRunSimQuiz.addEventListener("click", () => {
        state.activePage = "Practice Center";
        state.practiceStarted = true;
        renderApp();
      });
    }

    // Knowledge Gap Filter Tabs
    document.querySelectorAll("[data-gap-filter]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.activeGapFilter = btn.getAttribute("data-gap-filter");
        renderApp();
      });
    });

    // Resolve Gap Action
    document.querySelectorAll("[data-resolve-gap]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.activePage = "Practice Center";
        state.practiceStarted = true;
        renderApp();
      });
    });

    // "Why?" Modal Triggers
    document.querySelectorAll("[data-why-rec]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        state.selectedWhyRec = btn.getAttribute("data-why-rec");
        renderApp();
      });
    });

    // Topic Evidence Modal Triggers
    document.querySelectorAll("[data-topic-evidence]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        state.selectedEvidenceTopic = btn.getAttribute("data-topic-evidence");
        renderApp();
      });
    });

    // Start Recommendation
    document.querySelectorAll("[data-start-rec]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.activePage = "Practice Center";
        state.practiceStarted = true;
        renderApp();
      });
    });

    // Switch Student Persona
    document.querySelectorAll("[data-switch-student]").forEach(item => {
      item.addEventListener("click", () => {
        const idx = parseInt(item.getAttribute("data-switch-student"), 10);
        state.currentStudentIndex = idx;
        renderApp();
      });
    });

    // Practice Quiz Interactivity
    const btnStartQuizNow = document.getElementById("btn-start-quiz-now");
    if (btnStartQuizNow) {
      btnStartQuizNow.addEventListener("click", () => {
        state.practiceStarted = true;
        state.currentQuestionIdx = 0;
        state.userAnswers = {};
        renderApp();
      });
    }

    document.querySelectorAll("[data-option-idx]").forEach(btn => {
      btn.addEventListener("click", () => {
        const optIdx = parseInt(btn.getAttribute("data-option-idx"), 10);
        state.userAnswers[state.currentQuestionIdx] = optIdx;
        renderApp();
      });
    });

    const btnNextQ = document.getElementById("btn-next-question");
    if (btnNextQ) {
      btnNextQ.addEventListener("click", () => {
        state.currentQuestionIdx++;
        renderApp();
      });
    }

    const btnFinishQ = document.getElementById("btn-finish-quiz");
    if (btnFinishQ) {
      btnFinishQ.addEventListener("click", () => {
        alert("Evaluation complete! Your prerequisite mastery increased +14%. Check the updated Causal DAG.");
        state.simulatedPrereqMastery = 62;
        state.practiceStarted = false;
        state.activePage = "Causal Analysis";
        renderApp();
      });
    }

    const btnQuitQ = document.getElementById("btn-quit-quiz");
    if (btnQuitQ) {
      btnQuitQ.addEventListener("click", () => {
        state.practiceStarted = false;
        renderApp();
      });
    }

    // Modal Close
    const closeBtn = document.getElementById("modal-close-btn");
    const closeBtn2 = document.getElementById("modal-close-btn-2");
    const modalOverlay = document.getElementById("modal-overlay");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
    if (closeBtn2) {
      closeBtn2.addEventListener("click", closeModal);
    }
    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
      });
    }

    const modalJumpCausal = document.getElementById("modal-jump-causal");
    if (modalJumpCausal) {
      modalJumpCausal.addEventListener("click", () => {
        closeModal();
        state.activePage = "Causal Analysis";
        renderApp();
      });
    }

    const modalActionStart = document.getElementById("modal-action-start");
    if (modalActionStart) {
      modalActionStart.addEventListener("click", () => {
        closeModal();
        state.activePage = "Practice Center";
        state.practiceStarted = true;
        renderApp();
      });
    }
  }

  function closeModal() {
    state.selectedWhyRec = null;
    state.selectedEvidenceTopic = null;
    renderApp();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================
  // 15. INITIALIZE ON LOAD
  // ==========================================
  document.addEventListener("DOMContentLoaded", () => {
    renderApp();
  });

  // Fallback if script executes after DOMContentLoaded
  if (document.readyState === "complete" || document.readyState === "interactive") {
    renderApp();
  }

})();
