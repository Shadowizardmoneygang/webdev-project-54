// Initialize data
let semesters = JSON.parse(localStorage.getItem('semesters')) || [];

// Add subject button
document.getElementById('addSubject').addEventListener('click', function() {
    const subjectsContainer = document.getElementById('subjectsContainer');
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'subject';
    subjectDiv.innerHTML = `
        <input type="text" placeholder="Subject Name" class="subjectName" required>
        <input type="number" placeholder="Credits" class="credits" min="1" required>
        <select class="grade" required>
            <option value="">Grade</option>
            <option value="10">O (10)</option>
            <option value="9">A+ (9)</option>
            <option value="8">A (8)</option>
            <option value="7">B+ (7)</option>
            <option value="6">B (6)</option>
            <option value="5">C (5)</option>
            <option value="4">P (4)</option>
            <option value="0">F (0)</option>
        </select>
        <button type="button" class="removeSubject">Remove</button>
    `;
    subjectsContainer.appendChild(subjectDiv);
    
    // Add remove functionality
    subjectDiv.querySelector('.removeSubject').addEventListener('click', function() {
        subjectsContainer.removeChild(subjectDiv);
    });
});

// Remove subject functionality for initial subject
document.querySelector('.removeSubject').addEventListener('click', function() {
    const subjectsContainer = document.getElementById('subjectsContainer');
    if (subjectsContainer.children.length > 1) {
        subjectsContainer.removeChild(this.parentElement);
    } else {
        alert('At least one subject is required');
    }
});

// Calculate GPA
document.getElementById('semesterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const semesterName = document.getElementById('semesterName').value;
    const subjects = [];
    let totalCredits = 0;
    let totalPoints = 0;
    
    const subjectElements = document.querySelectorAll('.subject');
    subjectElements.forEach(subject => {
        const name = subject.querySelector('.subjectName').value;
        const credits = parseInt(subject.querySelector('.credits').value);
        const grade = parseFloat(subject.querySelector('.grade').value);
        
        if (name && credits && grade !== '') {
            subjects.push({ name, credits, grade });
            totalCredits += credits;
            totalPoints += credits * grade;
        }
    });
    
    if (subjects.length === 0) {
        alert('Please add at least one subject');
        return;
    }
    
    const gpa = totalPoints / totalCredits;
    
    const semester = {
        name: semesterName,
        subjects: subjects,
        totalCredits: totalCredits,
        gpa: gpa.toFixed(2)
    };
    
    semesters.push(semester);
    localStorage.setItem('semesters', JSON.stringify(semesters));
    
    displayResults();
    this.reset();
    
    // Reset subjects to one
    document.getElementById('subjectsContainer').innerHTML = `
        <div class="subject">
            <input type="text" placeholder="Subject Name" class="subjectName" required>
            <input type="number" placeholder="Credits" class="credits" min="1" required>
            <select class="grade" required>
                <option value="">Grade</option>
                <option value="10">O (10)</option>
                <option value="9">A+ (9)</option>
                <option value="8">A (8)</option>
                <option value="7">B+ (7)</option>
                <option value="6">B (6)</option>
                <option value="5">C (5)</option>
                <option value="4">P (4)</option>
                <option value="0">F (0)</option>
            </select>
            <button type="button" class="removeSubject">Remove</button>
        </div>
    `;
    
    // Re-add remove functionality
    document.querySelector('.removeSubject').addEventListener('click', function() {
        const subjectsContainer = document.getElementById('subjectsContainer');
        if (subjectsContainer.children.length > 1) {
            subjectsContainer.removeChild(this.parentElement);
        } else {
            alert('At least one subject is required');
        }
    });
});

// Display results
function displayResults() {
    const semestersList = document.getElementById('semestersList');
    const cgpaResult = document.getElementById('cgpaResult');
    
    semestersList.innerHTML = '';
    let totalCreditsAll = 0;
    let totalPointsAll = 0;
    
    semesters.forEach((semester, index) => {
        const semesterDiv = document.createElement('div');
        semesterDiv.className = 'semester-result';
        semesterDiv.innerHTML = `
            <h3>${semester.name}</h3>
            <p><strong>GPA:</strong> ${semester.gpa}</p>
            <p><strong>Total Credits:</strong> ${semester.totalCredits}</p>
            <div class="subject-list">
                ${semester.subjects.map(sub => 
                    `<div class="subject-item">
                        <span>${sub.name}</span>
                        <span>${sub.credits} credits × ${sub.grade} = ${sub.credits * sub.grade}</span>
                    </div>`
                ).join('')}
            </div>
            <button onclick="deleteSemester(${index})">Delete Semester</button>
        `;
        semestersList.appendChild(semesterDiv);
        
        totalCreditsAll += semester.totalCredits;
        totalPointsAll += semester.totalCredits * parseFloat(semester.gpa);
    });
    
    if (semesters.length > 0) {
        const cgpa = (totalPointsAll / totalCreditsAll).toFixed(2);
        cgpaResult.innerHTML = `
            <div class="cgpa-summary">
                <h3>Overall CGPA: ${cgpa}</h3>
                <p>Total Credits: ${totalCreditsAll}</p>
            </div>
        `;
    } else {
        cgpaResult.innerHTML = '';
    }
}

// Delete semester
function deleteSemester(index) {
    if (confirm('Are you sure you want to delete this semester?')) {
        semesters.splice(index, 1);
        localStorage.setItem('semesters', JSON.stringify(semesters));
        displayResults();
    }
}

// Load results on page load
displayResults();