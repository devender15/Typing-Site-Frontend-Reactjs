
const schoolBoards = () => {
    let boards = [
        "Board of intermediate education",
        "Central Board Of Secondary Education",
        "Board of Secondary Education, Assam",
        "Bihar School Examination Board",
        "Bihar Board Of Open Schooling & Examination",
        "Chhatisgarh Board Of Secondary Education",
        "Chhatisgarh State Open School",
        "Goa Board Of Secondary And Higher Secondary Education",
        "Gujarat Secondary And Higher Secondary Education Board",
        "Haryana Board of School Education",
        "Himachal Pradesh Board of School Education",
        "Jammu and Kashmir State Board of School Education",
        "Jharkhand Academic Council,Ranchi",
        "Govt. Of Karnataka Dept. Of Pre-University Education",
        "Karnataka Secondary Education, Examination Board",
        "Kerala Board Of Public Examination",
        "Kerala Board Of Higher Secondary Education",
        "Board of Secondary Education,  Madhya Pradesh",
        "M. P. State Open School Education Board",
        "Maharishi Patanjali Sanskrit Sansthan",
        "Maharashtra State Board Of Secondary And Higher Secondary Education",
        "Board of Secondary Education, Manipur",
        "Council of Higher Secondary Education, Manipur",
        "Meghalaya Board Of School Education",
        "Mizoram Board of School Education",
        "Nagaland Board of School Education",
        "Council of Higher Secondary Education, Odisha",
        "Board of Secondary Education, Odisha",
        "Punjab School Education Board",
        "Board of Secondary Education Rajasthan",
        "State Board Of School Examinations(Sec.) & Board Of Higher Secondary Examinations, Tamil Nadu",
        "Telangana State Board Of Intermediate Education, Nampally Hyderabad-500001",
        "Tripura Board Of Secondary Education",
        "Board of School Education Uttarakhand",
        "U.P. Board Of High School & Intermediate Education",
        "U.P. Board of Sec. Sanskrit Education Council",
        "West Bengal Board Of Secondary Education",
        "west Bengal Council Of Higher Secondary Education",
        "Gujarat Secondary & Higher Secondary Examination Board , vadodra",
        "Gujarat Secondary Education Board (GSEB) Vadodara, Gujarat",
        "Secondary School Leaving Certificate Examination Board Kerala",
        "Board of Secondary Education",
        "Tamilnadu Board of public Examination",
    ];


    let names = [...new Set(boards)];

    return names;
}



// creating the object of export functions
// const exportFunctions = {
//     schoolBoards,
//     toastMessage,
// }


export default schoolBoards;