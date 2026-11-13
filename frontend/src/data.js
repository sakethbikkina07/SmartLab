const mk = (keys, rows) => ({
  keys,
  rows: rows.map((r, i) =>
    Object.fromEntries([
      ['id', i + 1],
      ...keys.map((k, j) => [k, r[j]]),
    ])
  ),
});

export const DS = {
  // Exactly 5 colleges
  colleges: mk(
    ['name', 'city', 'students', 'status'],
    [
      ['Vignan Institute of Tech', 'Hyderabad', 500, 'Active'],
      ['Sri Chaitanya Engg', 'Vijayawada', 450, 'Active'],
      ['NovaTech College', 'Bengaluru', 400, 'Active'],
      ['Sagar Institute of Tech', 'Pune', 350, 'Active'],
      ['Apex Engineering Academy', 'Chennai', 300, 'Active'],
    ]
  ),

  // Exactly 5 departments
  departments: mk(
    ['name', 'hod', 'faculty', 'students'],
    [
      ['Computer Science & Engineering', 'Prof. Rohit Sharma', 5, 100],
      ['Information Technology', 'Dr. Meena Nair', 5, 100],
      ['AI & Data Science', 'Dr. P. Kulkarni', 5, 100],
      ['Electronics & Communication', 'Dr. S. Verma', 5, 100],
      ['Cyber Security & IoT', 'Dr. Rajesh Gupta', 5, 100],
    ]
  ),

  // Exactly 5 faculty members
  faculty: mk(
    ['name', 'department', 'subject', 'status'],
    [
      ['Dr. Ananya Iyer', 'CSE', 'Python Lab', 'Active'],
      ['Prof. Karan Bose', 'CSE', 'Java Lab', 'Active'],
      ['Dr. Lata Menon', 'IT', 'C Programming Lab', 'Active'],
      ['Prof. Vikram Rao', 'AI & DS', 'Data Science Lab', 'Active'],
      ['Dr. Sunita Deshmukh', 'ECE', 'VLSI Design Lab', 'Active'],
    ]
  ),

  // Exactly 5 students
  students: mk(
    ['name', 'roll', 'department', 'average', 'status'],
    [
      ['Sneha Reddy', '21CS001', 'CSE', '86%', 'Active'],
      ['Rahul Verma', '21CS014', 'CSE', '72%', 'Active'],
      ['Priya Das', '21CS027', 'CSE', '91%', 'Active'],
      ['Imran Khan', '21CS033', 'CSE', '64%', 'Active'],
      ['Ankit Sharma', '21CS045', 'CSE', '78%', 'Active'],
    ]
  ),

  // Exactly 5 subjects / labs
  subjects: mk(
    ['code', 'name', 'semester', 'experiments'],
    [
      ['CS301', 'Python Programming Lab', 3, 5],
      ['CS302', 'Java Programming Lab', 4, 5],
      ['CS201', 'C Data Structures Lab', 2, 5],
      ['CS401', 'Database Systems Lab', 4, 5],
      ['CS501', 'Web Technology Lab', 5, 5],
    ]
  ),

  // Exactly 5 experiments
  experiments: mk(
    ['title', 'subject', 'difficulty', 'status'],
    [
      ['Fibonacci Series', 'Python Lab', 'Easy', 'Completed'],
      ['Bubble Sort', 'Python Lab', 'Medium', 'In Progress'],
      ['Stack using Arrays', 'C Lab', 'Medium', 'Submitted'],
      ['Inheritance Demo', 'Java Lab', 'Hard', 'Not started'],
      ['Binary Search Tree', 'C Lab', 'Hard', 'Not started'],
    ]
  ),

  // Exactly 5 lab manuals
  manuals: mk(
    ['title', 'type', 'experiments', 'status'],
    [
      ['Python Lab Manual 2026.pdf', 'PDF', 5, 'Published'],
      ['Java Lab Manual 2026.docx', 'DOCX', 5, 'Published'],
      ['C Programming Manual.pdf', 'PDF', 5, 'Published'],
      ['DBMS Lab Manual.pdf', 'PDF', 5, 'Published'],
      ['Web Technologies Manual.pdf', 'PDF', 5, 'Published'],
    ]
  ),

  // Exactly 5 tasks
  tasks: mk(
    ['title', 'subject', 'deadline', 'marks', 'status'],
    [
      ['Palindrome checker', 'Python Lab', '2026-11-15', 10, 'Pending'],
      ['Matrix multiplication', 'C Lab', '2026-11-18', 10, 'Submitted'],
      ['Linked list traversal', 'Java Lab', '2026-11-20', 10, 'Evaluated'],
      ['Binary search implementation', 'Python Lab', '2026-11-22', 10, 'Pending'],
      ['SQL schema design', 'DBMS Lab', '2026-11-25', 10, 'Pending'],
    ]
  ),

  // Exactly 5 assessments
  assessments: mk(
    ['title', 'subject', 'date', 'duration', 'status'],
    [
      ['Mid-lab Practical 1', 'Python Lab', '2026-11-20', '90 min', 'Scheduled'],
      ['Internal Practical 2', 'C Lab', '2026-11-28', '120 min', 'Scheduled'],
      ['Viva-voce Round 1', 'Java Lab', '2026-11-05', '30 min', 'Completed'],
      ['Continuous Test 1', 'DBMS Lab', '2026-12-02', '60 min', 'Scheduled'],
      ['Semester End Practical', 'Web Tech Lab', '2026-12-10', '180 min', 'Scheduled'],
    ]
  ),

  // Exactly 5 submissions
  submissions: mk(
    ['student', 'task', 'similarity', 'score', 'status'],
    [
      ['Sneha Reddy', 'Palindrome checker', '12%', 9, 'Evaluated'],
      ['Rahul Verma', 'Palindrome checker', '78%', 6, 'Needs review'],
      ['Priya Das', 'Palindrome checker', '74%', 7, 'Needs review'],
      ['Imran Khan', 'Matrix multiplication', '15%', 8, 'Evaluated'],
      ['Ankit Sharma', 'Linked list traversal', '20%', 9, 'Evaluated'],
    ]
  ),

  // Exactly 5 live monitoring records
  monitoring: mk(
    ['student', 'roll', 'experiment', 'activity', 'status'],
    [
      ['Sneha Reddy', '21CS001', 'Bubble sort', 'Running program', 'Working'],
      ['Rahul Verma', '21CS014', 'Bubble sort', 'Idle 6 min', 'Needs assistance'],
      ['Priya Das', '21CS027', 'Fibonacci', 'Submitted', 'Completed'],
      ['Imran Khan', '21CS033', 'Stack arrays', 'Debugging syntax', 'Working'],
      ['Ankit Sharma', '21CS045', 'Inheritance', 'Writing tests', 'Working'],
    ]
  ),

  // Exactly 5 MCQ topics
  mcq: mk(
    ['topic', 'questions', 'difficulty', 'status'],
    [
      ['Loops in Python', 5, 'Easy', 'Published'],
      ['Pointers in C', 5, 'Hard', 'Published'],
      ['OOP in Java', 5, 'Medium', 'Published'],
      ['SQL Queries & Joins', 5, 'Medium', 'Published'],
      ['Data Structures & Complexity', 5, 'Hard', 'Published'],
    ]
  ),

  // Exactly 5 viva records
  viva: mk(
    ['student', 'experiment', 'marks', 'remarks'],
    [
      ['Sneha Reddy', 'Bubble sort', 9, 'Clear concepts'],
      ['Rahul Verma', 'Stack using arrays', 6, 'Revise complexity'],
      ['Priya Das', 'Fibonacci series', 10, 'Excellent recursion logic'],
      ['Imran Khan', 'Matrix multiplication', 7, 'Good implementation'],
      ['Ankit Sharma', 'Linked list', 8, 'Well articulated pointers'],
    ]
  ),

  // Exactly 5 attendance records
  attendance: mk(
    ['student', 'roll', 'session', 'status'],
    [
      ['Sneha Reddy', '21CS001', 'Python Lab - Nov 10', 'Present'],
      ['Rahul Verma', '21CS014', 'Python Lab - Nov 10', 'Absent'],
      ['Priya Das', '21CS027', 'Python Lab - Nov 10', 'Present'],
      ['Imran Khan', '21CS033', 'Python Lab - Nov 10', 'Present'],
      ['Ankit Sharma', '21CS045', 'Python Lab - Nov 10', 'Present'],
    ]
  ),

  // Exactly 5 hardware resources
  resources: mk(
    ['name', 'type', 'location', 'status'],
    [
      ['Dell OptiPlex #12', 'Computer', 'Lab 2', 'Available'],
      ['Dell OptiPlex #13', 'Computer', 'Lab 2', 'Maintenance'],
      ['Projector P1', 'Equipment', 'Lab 1', 'Allocated'],
      ['Cisco Catalyst Switch 24P', 'Network', 'Server Rack 1', 'Available'],
      ['HP LaserJet Pro 400', 'Printer', 'Lab 1', 'Available'],
    ]
  ),

  // Exactly 5 marks records
  marks: mk(
    ['student', 'practical', 'testcases', 'mcq', 'viva', 'final', 'status'],
    [
      ['Sneha Reddy', 18, 14, 9, 9, '50/50', 'Published'],
      ['Rahul Verma', 14, 10, 7, 6, '37/50', 'Draft'],
      ['Priya Das', 19, 15, 10, 10, '54/50', 'Published'],
      ['Imran Khan', 15, 12, 8, 7, '42/50', 'Published'],
      ['Ankit Sharma', 17, 13, 9, 8, '47/50', 'Published'],
    ]
  ),

  // Exactly 5 notes
  notes: mk(
    ['title', 'type', 'experiment', 'date'],
    [
      ['Sorting Cheat Sheet', 'Digital', 'Bubble sort', '2026-10-30'],
      ['Pointer Diagrams & Traversal', 'Handwritten', 'Stack', '2026-11-02'],
      ['Time Complexity Reference Table', 'Digital', 'Binary Search', '2026-11-05'],
      ['Recursion Tree Visuals', 'Handwritten', 'Fibonacci', '2026-11-08'],
      ['OOP Principles & Examples', 'Digital', 'Inheritance', '2026-11-10'],
    ]
  ),

  // Exactly 5 execution history records
  history: mk(
    ['file', 'language', 'status', 'time'],
    [
      ['bubble_sort.py', 'Python', 'Passed 5/5', '10 Nov, 10:42'],
      ['stack.c', 'C', 'Compile error', '09 Nov, 16:10'],
      ['palindrome.py', 'Python', 'Passed 5/5', '08 Nov, 14:20'],
      ['matrix_mult.c', 'C', 'Passed 4/5', '07 Nov, 11:15'],
      ['inheritance.java', 'Java', 'Passed 5/5', '06 Nov, 09:30'],
    ]
  ),

  // Exactly 5 record entries
  records: mk(
    ['experiment', 'submitted', 'evaluated', 'remarks'],
    [
      ['Fibonacci Series', 'Yes', '2026-11-01', 'Good'],
      ['Bubble Sort', 'Yes', '2026-11-04', 'Optimal swap logic'],
      ['Stack using Arrays', 'Yes', '2026-11-08', 'Clear pointer tracking'],
      ['Palindrome Checker', 'Yes', '2026-11-10', 'All test cases passed'],
      ['Matrix Multiplication', 'Pending', 'Pending', 'Under review'],
    ]
  ),

  // Exactly 5 badges
  badges: mk(
    ['badge', 'earned', 'points'],
    [
      ['First Program', 'Yes', 50],
      ['Python Beginner', 'Yes', 100],
      ['Consistent Learner', 'Yes', 150],
      ['Algorithm Specialist', 'Yes', 200],
      ['Debugging Expert', 'No', 250],
    ]
  ),

  // Exactly 5 skills
  skills: mk(
    ['skill', 'level', 'verified'],
    [
      ['Python Programming', '85%', 'Yes'],
      ['Data Structures & Algorithms', '78%', 'Yes'],
      ['C / C++ Systems', '72%', 'Yes'],
      ['Java & Object-Oriented Design', '68%', 'Yes'],
      ['Database & SQL Management', '60%', 'Yes'],
    ]
  ),

  // Exactly 5 activity items
  activity: mk(
    ['event', 'by', 'time'],
    [
      ['College registered', 'Super Admin', '1h ago'],
      ['Lab manual published', 'Dr. Ananya Iyer', '3h ago'],
      ['Daily task assigned', 'Dr. Ananya Iyer', '5h ago'],
      ['Internal marks approved', 'Prof. Rohit Sharma', '1d ago'],
      ['System hardware audit completed', 'Dr. Kavya Rao', '2d ago'],
    ]
  ),

  // Exactly 1 demo user for each role (5 users total)
  users: mk(
    ['name', 'role', 'college', 'status'],
    [
      ['Aarav Mehta', 'Super Admin', 'Platform Super Admin', 'Active'],
      ['Dr. Kavya Rao', 'College Admin', 'Vignan Institute of Tech', 'Active'],
      ['Prof. Rohit Sharma', 'HOD', 'Vignan Institute of Tech', 'Active'],
      ['Dr. Ananya Iyer', 'Faculty', 'Vignan Institute of Tech', 'Active'],
      ['Sneha Reddy', 'Student', 'Vignan Institute of Tech', 'Active'],
    ]
  ),
};
