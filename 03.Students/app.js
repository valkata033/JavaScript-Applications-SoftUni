async function solve() {

    let url = 'http://localhost:3030/jsonstore/collections/students';

    let tBody = document.querySelector('#results tbody')

    let submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', onSumbit);

    let response = await fetch(url);
    let data = await response.json();

    Object.values(data).forEach(({ firstName, lastName, facultyNumber, grade }) => {

        let tr = document.createElement('tr');

        let thFirstName = document.createElement('th');
        thFirstName.textContent = firstName;

        let thLastName = document.createElement('th');
        thLastName.textContent = lastName;

        let thFacultyNumber = document.createElement('th');
        thFacultyNumber.textContent = facultyNumber;

        let thGrade = document.createElement('th');
        thGrade.textContent = Number(grade);

        tr.appendChild(thFirstName);
        tr.appendChild(thLastName);
        tr.appendChild(thFacultyNumber);
        tr.appendChild(thGrade);

        tBody.appendChild(tr);
    });


    async function onSumbit(e) {
        e.preventDefault();

        let firstName = document.getElementsByName('firstName')[0];
        let lastName = document.getElementsByName('lastName')[0];
        let facultyNumber = document.getElementsByName('facultyNumber')[0];
        let grade = document.getElementsByName('grade')[0];


        if (firstName.value !== '' && lastName.value !== '' &&
            facultyNumber.value !== '' && grade.value !== '') {

            let response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    facultyNumber: facultyNumber.value,
                    grade: Number(grade.value),
                }),
            });

            let tr = document.createElement('tr');

            let thFirstName = document.createElement('th');
            thFirstName.textContent = firstName.value;

            let thLastName = document.createElement('th');
            thLastName.textContent = lastName.value;

            let thFacultyNumber = document.createElement('th');
            thFacultyNumber.textContent = facultyNumber.value;

            let thGrade = document.createElement('th');
            thGrade.textContent = Number(grade.value);

            tr.appendChild(thFirstName);
            tr.appendChild(thLastName);
            tr.appendChild(thFacultyNumber);
            tr.appendChild(thGrade);

            tBody.appendChild(tr);

            firstName.value = '';
            lastName.value = '';
            facultyNumber.value = '';
            grade.value = '';
        }
    }

}

solve()