# CGPA Calculator - BTech Project

A web application to calculate GPA for individual semesters and overall CGPA for BTech students.

## Features

- Add multiple semesters
- Add subjects with credits and grades
- Calculate GPA for each semester
- Calculate overall CGPA
- View detailed breakdown of calculations
- Delete semesters if needed
- Data persists in browser localStorage

## Grade Points

- O: 10
- A+: 9
- A: 8
- B+: 7
- B: 6
- C: 5
- P: 4
- F: 0

## How to Use

1. Open `index.html` in a web browser
2. Enter semester name
3. Add subjects with their credits and grades
4. Click "Calculate GPA" to add the semester
5. View individual semester GPAs and overall CGPA
6. Delete semesters if needed

## Formula

**GPA** = (Sum of (Credits × Grade Points)) / Total Credits

**CGPA** = (Sum of (Semester Credits × Semester GPA)) / Total Credits from all semesters

## Files

- `index.html`: Main application
- `styles.css`: CSS styling
- `script.js`: JavaScript functionality
