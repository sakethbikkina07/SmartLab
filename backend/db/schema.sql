-- =====================================================================
-- SmartLab Database Schema & Seed Data (MySQL)
-- 5 Demo Users (1 per role) & Exactly 5 Records in each required table
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `smartlab` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `smartlab`;

-- 1. Users Table (1 Demo User for each of the 5 Roles)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL DEFAULT '$2b$10$demo1234dummyhashedpassword',
  `role` ENUM('superadmin', 'admin', 'hod', 'faculty', 'student') NOT NULL,
  `college` VARCHAR(150) DEFAULT 'Vignan Institute of Tech',
  `department` VARCHAR(100) DEFAULT 'CSE',
  `roll` VARCHAR(50) DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Colleges Table (5 Records)
CREATE TABLE IF NOT EXISTS `colleges` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(200) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `students` INT DEFAULT 500,
  `status` VARCHAR(50) DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Departments Table (5 Records)
CREATE TABLE IF NOT EXISTS `departments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `hod` VARCHAR(120) NOT NULL,
  `faculty` INT DEFAULT 5,
  `students` INT DEFAULT 100,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Faculty Table (5 Records)
CREATE TABLE IF NOT EXISTS `faculty` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `subject` VARCHAR(150) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 5. Students Table (5 Records)
CREATE TABLE IF NOT EXISTS `students` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL,
  `roll` VARCHAR(50) NOT NULL UNIQUE,
  `department` VARCHAR(100) NOT NULL,
  `average` VARCHAR(20) DEFAULT '75%',
  `status` VARCHAR(50) DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 6. Subjects Table (5 Records)
CREATE TABLE IF NOT EXISTS `subjects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `semester` INT DEFAULT 3,
  `experiments` INT DEFAULT 5,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 7. Experiments Table (5 Records)
CREATE TABLE IF NOT EXISTS `experiments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `subject` VARCHAR(150) NOT NULL,
  `difficulty` ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
  `status` VARCHAR(50) DEFAULT 'In Progress',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 8. Lab Manuals Table (5 Records)
CREATE TABLE IF NOT EXISTS `manuals` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `type` VARCHAR(50) DEFAULT 'PDF',
  `experiments` INT DEFAULT 5,
  `status` VARCHAR(50) DEFAULT 'Published',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 9. Daily Tasks Table (5 Records)
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `subject` VARCHAR(150) NOT NULL,
  `deadline` DATE NOT NULL,
  `marks` INT DEFAULT 10,
  `status` VARCHAR(50) DEFAULT 'Pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 10. Assessments Table (5 Records)
CREATE TABLE IF NOT EXISTS `assessments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `subject` VARCHAR(150) NOT NULL,
  `date` DATE NOT NULL,
  `duration` VARCHAR(50) DEFAULT '90 min',
  `status` VARCHAR(50) DEFAULT 'Scheduled',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 11. Submissions Table (5 Records)
CREATE TABLE IF NOT EXISTS `submissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student` VARCHAR(120) NOT NULL,
  `task` VARCHAR(200) NOT NULL,
  `similarity` VARCHAR(20) DEFAULT '0%',
  `score` INT DEFAULT 10,
  `status` VARCHAR(50) DEFAULT 'Evaluated',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 12. Monitoring Table (5 Records)
CREATE TABLE IF NOT EXISTS `monitoring` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student` VARCHAR(120) NOT NULL,
  `roll` VARCHAR(50) NOT NULL,
  `experiment` VARCHAR(200) NOT NULL,
  `activity` VARCHAR(150) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Working',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 13. MCQ Topics Table (5 Records)
CREATE TABLE IF NOT EXISTS `mcq` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `topic` VARCHAR(200) NOT NULL,
  `questions` INT DEFAULT 5,
  `difficulty` ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
  `status` VARCHAR(50) DEFAULT 'Published',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 14. Viva Table (5 Records)
CREATE TABLE IF NOT EXISTS `viva` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student` VARCHAR(120) NOT NULL,
  `experiment` VARCHAR(200) NOT NULL,
  `marks` INT DEFAULT 9,
  `remarks` VARCHAR(255) DEFAULT 'Good explanation',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 15. Attendance Table (5 Records)
CREATE TABLE IF NOT EXISTS `attendance` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student` VARCHAR(120) NOT NULL,
  `roll` VARCHAR(50) NOT NULL,
  `session` VARCHAR(150) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Present',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 16. Resources Table (5 Records)
CREATE TABLE IF NOT EXISTS `resources` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Available',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 17. Marks Table (5 Records)
CREATE TABLE IF NOT EXISTS `marks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student` VARCHAR(120) NOT NULL,
  `practical` INT DEFAULT 18,
  `testcases` INT DEFAULT 14,
  `mcq` INT DEFAULT 9,
  `viva` INT DEFAULT 9,
  `final` VARCHAR(50) DEFAULT '50/50',
  `status` VARCHAR(50) DEFAULT 'Published',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 18. Notes Table (5 Records)
CREATE TABLE IF NOT EXISTS `notes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `type` VARCHAR(50) DEFAULT 'Digital',
  `experiment` VARCHAR(200) NOT NULL,
  `date` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 19. History Table (5 Records)
CREATE TABLE IF NOT EXISTS `history` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `file` VARCHAR(150) NOT NULL,
  `language` VARCHAR(50) NOT NULL,
  `status` VARCHAR(100) NOT NULL,
  `time` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 20. Records Table (5 Records)
CREATE TABLE IF NOT EXISTS `records` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `experiment` VARCHAR(200) NOT NULL,
  `submitted` VARCHAR(50) DEFAULT 'Yes',
  `evaluated` VARCHAR(50) DEFAULT '2026-11-01',
  `remarks` VARCHAR(255) DEFAULT 'Good',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 21. Badges Table (5 Records)
CREATE TABLE IF NOT EXISTS `badges` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `badge` VARCHAR(150) NOT NULL,
  `earned` VARCHAR(50) DEFAULT 'Yes',
  `points` INT DEFAULT 50,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 22. Skills Table (5 Records)
CREATE TABLE IF NOT EXISTS `skills` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `skill` VARCHAR(150) NOT NULL,
  `level` VARCHAR(50) DEFAULT '80%',
  `verified` VARCHAR(50) DEFAULT 'Yes',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 23. Activity Table (5 Records)
CREATE TABLE IF NOT EXISTS `activity` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `event` VARCHAR(200) NOT NULL,
  `by` VARCHAR(120) NOT NULL,
  `time` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 24. Key-Value State Store Table
CREATE TABLE IF NOT EXISTS `kv_store` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `key_name` VARCHAR(100) NOT NULL UNIQUE,
  `val_json` LONGTEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =====================================================================
-- SEED DATA: 1 Demo User for each Role & 5 Records per table
-- =====================================================================

TRUNCATE TABLE `users`;
INSERT INTO `users` (`id`, `name`, `email`, `role`, `college`, `department`, `roll`, `status`) VALUES
(1, 'Aarav Mehta', 'super@smartlab.edu', 'superadmin', 'Platform Super Admin', 'Management', NULL, 'Active'),
(2, 'Dr. Kavya Rao', 'admin@smartlab.edu', 'admin', 'Vignan Institute of Tech', 'Administration', NULL, 'Active'),
(3, 'Prof. Rohit Sharma', 'hod@smartlab.edu', 'hod', 'Vignan Institute of Tech', 'Computer Science & Engineering', NULL, 'Active'),
(4, 'Dr. Ananya Iyer', 'faculty@smartlab.edu', 'faculty', 'Vignan Institute of Tech', 'CSE', NULL, 'Active'),
(5, 'Sneha Reddy', 'student@smartlab.edu', 'student', 'Vignan Institute of Tech', 'CSE', '21CS001', 'Active');

TRUNCATE TABLE `colleges`;
INSERT INTO `colleges` (`id`, `name`, `city`, `students`, `status`) VALUES
(1, 'Vignan Institute of Tech', 'Hyderabad', 500, 'Active'),
(2, 'Sri Chaitanya Engg', 'Vijayawada', 450, 'Active'),
(3, 'NovaTech College', 'Bengaluru', 400, 'Active'),
(4, 'Sagar Institute of Tech', 'Pune', 350, 'Active'),
(5, 'Apex Engineering Academy', 'Chennai', 300, 'Active');

TRUNCATE TABLE `departments`;
INSERT INTO `departments` (`id`, `name`, `hod`, `faculty`, `students`) VALUES
(1, 'Computer Science & Engineering', 'Prof. Rohit Sharma', 5, 100),
(2, 'Information Technology', 'Dr. Meena Nair', 5, 100),
(3, 'AI & Data Science', 'Dr. P. Kulkarni', 5, 100),
(4, 'Electronics & Communication', 'Dr. S. Verma', 5, 100),
(5, 'Cyber Security & IoT', 'Dr. Rajesh Gupta', 5, 100);

TRUNCATE TABLE `faculty`;
INSERT INTO `faculty` (`id`, `name`, `department`, `subject`, `status`) VALUES
(1, 'Dr. Ananya Iyer', 'CSE', 'Python Lab', 'Active'),
(2, 'Prof. Karan Bose', 'CSE', 'Java Lab', 'Active'),
(3, 'Dr. Lata Menon', 'IT', 'C Programming Lab', 'Active'),
(4, 'Prof. Vikram Rao', 'AI & DS', 'Data Science Lab', 'Active'),
(5, 'Dr. Sunita Deshmukh', 'ECE', 'VLSI Design Lab', 'Active');

TRUNCATE TABLE `students`;
INSERT INTO `students` (`id`, `name`, `roll`, `department`, `average`, `status`) VALUES
(1, 'Sneha Reddy', '21CS001', 'CSE', '86%', 'Active'),
(2, 'Rahul Verma', '21CS014', 'CSE', '72%', 'Active'),
(3, 'Priya Das', '21CS027', 'CSE', '91%', 'Active'),
(4, 'Imran Khan', '21CS033', 'CSE', '64%', 'Active'),
(5, 'Ankit Sharma', '21CS045', 'CSE', '78%', 'Active');

TRUNCATE TABLE `subjects`;
INSERT INTO `subjects` (`id`, `code`, `name`, `semester`, `experiments`) VALUES
(1, 'CS301', 'Python Programming Lab', 3, 5),
(2, 'CS302', 'Java Programming Lab', 4, 5),
(3, 'CS201', 'C Data Structures Lab', 2, 5),
(4, 'CS401', 'Database Systems Lab', 4, 5),
(5, 'CS501', 'Web Technology Lab', 5, 5);

TRUNCATE TABLE `experiments`;
INSERT INTO `experiments` (`id`, `title`, `subject`, `difficulty`, `status`) VALUES
(1, 'Fibonacci Series', 'Python Lab', 'Easy', 'Completed'),
(2, 'Bubble Sort', 'Python Lab', 'Medium', 'In Progress'),
(3, 'Stack using Arrays', 'C Lab', 'Medium', 'Submitted'),
(4, 'Inheritance Demo', 'Java Lab', 'Hard', 'Not started'),
(5, 'Binary Search Tree', 'C Lab', 'Hard', 'Not started');

TRUNCATE TABLE `manuals`;
INSERT INTO `manuals` (`id`, `title`, `type`, `experiments`, `status`) VALUES
(1, 'Python Lab Manual 2026.pdf', 'PDF', 5, 'Published'),
(2, 'Java Lab Manual 2026.docx', 'DOCX', 5, 'Published'),
(3, 'C Programming Manual.pdf', 'PDF', 5, 'Published'),
(4, 'DBMS Lab Manual.pdf', 'PDF', 5, 'Published'),
(5, 'Web Technologies Manual.pdf', 'PDF', 5, 'Published');

TRUNCATE TABLE `tasks`;
INSERT INTO `tasks` (`id`, `title`, `subject`, `deadline`, `marks`, `status`) VALUES
(1, 'Palindrome checker', 'Python Lab', '2026-11-15', 10, 'Pending'),
(2, 'Matrix multiplication', 'C Lab', '2026-11-18', 10, 'Submitted'),
(3, 'Linked list traversal', 'Java Lab', '2026-11-20', 10, 'Evaluated'),
(4, 'Binary search implementation', 'Python Lab', '2026-11-22', 10, 'Pending'),
(5, 'SQL schema design', 'DBMS Lab', '2026-11-25', 10, 'Pending');

TRUNCATE TABLE `assessments`;
INSERT INTO `assessments` (`id`, `title`, `subject`, `date`, `duration`, `status`) VALUES
(1, 'Mid-lab Practical 1', 'Python Lab', '2026-11-20', '90 min', 'Scheduled'),
(2, 'Internal Practical 2', 'C Lab', '2026-11-28', '120 min', 'Scheduled'),
(3, 'Viva-voce Round 1', 'Java Lab', '2026-11-05', '30 min', 'Completed'),
(4, 'Continuous Test 1', 'DBMS Lab', '2026-12-02', '60 min', 'Scheduled'),
(5, 'Semester End Practical', 'Web Tech Lab', '2026-12-10', '180 min', 'Scheduled');

TRUNCATE TABLE `submissions`;
INSERT INTO `submissions` (`id`, `student`, `task`, `similarity`, `score`, `status`) VALUES
(1, 'Sneha Reddy', 'Palindrome checker', '12%', 9, 'Evaluated'),
(2, 'Rahul Verma', 'Palindrome checker', '78%', 6, 'Needs review'),
(3, 'Priya Das', 'Palindrome checker', '74%', 7, 'Needs review'),
(4, 'Imran Khan', 'Matrix multiplication', '15%', 8, 'Evaluated'),
(5, 'Ankit Sharma', 'Linked list traversal', '20%', 9, 'Evaluated');

TRUNCATE TABLE `monitoring`;
INSERT INTO `monitoring` (`id`, `student`, `roll`, `experiment`, `activity`, `status`) VALUES
(1, 'Sneha Reddy', '21CS001', 'Bubble sort', 'Running program', 'Working'),
(2, 'Rahul Verma', '21CS014', 'Bubble sort', 'Idle 6 min', 'Needs assistance'),
(3, 'Priya Das', '21CS027', 'Fibonacci', 'Submitted', 'Completed'),
(4, 'Imran Khan', '21CS033', 'Stack arrays', 'Debugging syntax', 'Working'),
(5, 'Ankit Sharma', '21CS045', 'Inheritance', 'Writing tests', 'Working');

TRUNCATE TABLE `mcq`;
INSERT INTO `mcq` (`id`, `topic`, `questions`, `difficulty`, `status`) VALUES
(1, 'Loops in Python', 5, 'Easy', 'Published'),
(2, 'Pointers in C', 5, 'Hard', 'Published'),
(3, 'OOP in Java', 5, 'Medium', 'Published'),
(4, 'SQL Queries & Joins', 5, 'Medium', 'Published'),
(5, 'Data Structures & Complexity', 5, 'Hard', 'Published');

TRUNCATE TABLE `viva`;
INSERT INTO `viva` (`id`, `student`, `experiment`, `marks`, `remarks`) VALUES
(1, 'Sneha Reddy', 'Bubble sort', 9, 'Clear concepts'),
(2, 'Rahul Verma', 'Stack using arrays', 6, 'Revise complexity'),
(3, 'Priya Das', 'Fibonacci series', 10, 'Excellent recursion logic'),
(4, 'Imran Khan', 'Matrix multiplication', 7, 'Good implementation'),
(5, 'Ankit Sharma', 'Linked list', 8, 'Well articulated pointers');

TRUNCATE TABLE `attendance`;
INSERT INTO `attendance` (`id`, `student`, `roll`, `session`, `status`) VALUES
(1, 'Sneha Reddy', '21CS001', 'Python Lab - Nov 10', 'Present'),
(2, 'Rahul Verma', '21CS014', 'Python Lab - Nov 10', 'Absent'),
(3, 'Priya Das', '21CS027', 'Python Lab - Nov 10', 'Present'),
(4, 'Imran Khan', '21CS033', 'Python Lab - Nov 10', 'Present'),
(5, 'Ankit Sharma', '21CS045', 'Python Lab - Nov 10', 'Present');

TRUNCATE TABLE `resources`;
INSERT INTO `resources` (`id`, `name`, `type`, `location`, `status`) VALUES
(1, 'Dell OptiPlex #12', 'Computer', 'Lab 2', 'Available'),
(2, 'Dell OptiPlex #13', 'Computer', 'Lab 2', 'Maintenance'),
(3, 'Projector P1', 'Equipment', 'Lab 1', 'Allocated'),
(4, 'Cisco Catalyst Switch 24P', 'Network', 'Server Rack 1', 'Available'),
(5, 'HP LaserJet Pro 400', 'Printer', 'Lab 1', 'Available');

TRUNCATE TABLE `marks`;
INSERT INTO `marks` (`id`, `student`, `practical`, `testcases`, `mcq`, `viva`, `final`, `status`) VALUES
(1, 'Sneha Reddy', 18, 14, 9, 9, '50/50', 'Published'),
(2, 'Rahul Verma', 14, 10, 7, 6, '37/50', 'Draft'),
(3, 'Priya Das', 19, 15, 10, 10, '54/50', 'Published'),
(4, 'Imran Khan', 15, 12, 8, 7, '42/50', 'Published'),
(5, 'Ankit Sharma', 17, 13, 9, 8, '47/50', 'Published');

TRUNCATE TABLE `notes`;
INSERT INTO `notes` (`id`, `title`, `type`, `experiment`, `date`) VALUES
(1, 'Sorting Cheat Sheet', 'Digital', 'Bubble sort', '2026-10-30'),
(2, 'Pointer Diagrams & Traversal', 'Handwritten', 'Stack', '2026-11-02'),
(3, 'Time Complexity Reference Table', 'Digital', 'Binary Search', '2026-11-05'),
(4, 'Recursion Tree Visuals', 'Handwritten', 'Fibonacci', '2026-11-08'),
(5, 'OOP Principles & Examples', 'Digital', 'Inheritance', '2026-11-10');

TRUNCATE TABLE `history`;
INSERT INTO `history` (`id`, `file`, `language`, `status`, `time`) VALUES
(1, 'bubble_sort.py', 'Python', 'Passed 5/5', '10 Nov, 10:42'),
(2, 'stack.c', 'C', 'Compile error', '09 Nov, 16:10'),
(3, 'palindrome.py', 'Python', 'Passed 5/5', '08 Nov, 14:20'),
(4, 'matrix_mult.c', 'C', 'Passed 4/5', '07 Nov, 11:15'),
(5, 'inheritance.java', 'Java', 'Passed 5/5', '06 Nov, 09:30');

TRUNCATE TABLE `records`;
INSERT INTO `records` (`id`, `experiment`, `submitted`, `evaluated`, `remarks`) VALUES
(1, 'Fibonacci Series', 'Yes', '2026-11-01', 'Good'),
(2, 'Bubble Sort', 'Yes', '2026-11-04', 'Optimal swap logic'),
(3, 'Stack using Arrays', 'Yes', '2026-11-08', 'Clear pointer tracking'),
(4, 'Palindrome Checker', 'Yes', '2026-11-10', 'All test cases passed'),
(5, 'Matrix Multiplication', 'Pending', 'Pending', 'Under review');

TRUNCATE TABLE `badges`;
INSERT INTO `badges` (`id`, `badge`, `earned`, `points`) VALUES
(1, 'First Program', 'Yes', 50),
(2, 'Python Beginner', 'Yes', 100),
(3, 'Consistent Learner', 'Yes', 150),
(4, 'Algorithm Specialist', 'Yes', 200),
(5, 'Debugging Expert', 'No', 250);

TRUNCATE TABLE `skills`;
INSERT INTO `skills` (`id`, `skill`, `level`, `verified`) VALUES
(1, 'Python Programming', '85%', 'Yes'),
(2, 'Data Structures & Algorithms', '78%', 'Yes'),
(3, 'C / C++ Systems', '72%', 'Yes'),
(4, 'Java & Object-Oriented Design', '68%', 'Yes'),
(5, 'Database & SQL Management', '60%', 'Yes');

TRUNCATE TABLE `activity`;
INSERT INTO `activity` (`id`, `event`, `by`, `time`) VALUES
(1, 'College registered', 'Super Admin', '1h ago'),
(2, 'Lab manual published', 'Dr. Ananya Iyer', '3h ago'),
(3, 'Daily task assigned', 'Dr. Ananya Iyer', '5h ago'),
(4, 'Internal marks approved', 'Prof. Rohit Sharma', '1d ago'),
(5, 'System hardware audit completed', 'Dr. Kavya Rao', '2d ago');

