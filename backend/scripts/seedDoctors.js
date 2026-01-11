const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Doctor = require("../models/Doctor");

dotenv.config();

const doctorsData = [
  {
    doctorId: "supriya-narayan",
    name: "Dr. Supriya Narayan",
    title: "CEO and Senior Consultant",
    specialty: "Obstetrician & Gynecologist",
    email: "supriya.narayan@panaceamedicare.com",
    phone: "+91 98765 43210",
    image: "/assets/doctor-1.jpg",
    qualifications: [
      "MBBS, MS (Obst. & Gynae) Patna Medical College & Hospital",
      "Ex-Senior Resident, Dept. of Obst. & Gynae DMCH, Darbhanga",
    ],
    timetable: {
      days: "Friday - Thursday",
      hours: "09:00 AM - 08:30 PM",
    },
    hospital: "Panacea Medicare",
    experience: "11+ Years",
    about: `Panacea Medicare Research Centre is North Bihar's first and most advanced center for Obstetrics, Gynecology, Infertility, and Pediatrics, offering 24x7 Radiology and Pathology services.

The center is the dream project of Dr. Supriya Narayan, envisioned since her early school days. It was inaugurated and became fully operational on 2nd February 2025.

Coming from a lower-middle-class family, Dr. Supriya's dream was pure and deeply rooted in her dedication to serve the poor, middle-class, and patients with complex obstetric and gynecological conditions.

She completed her schooling at the prestigious Jawahar Navodaya Vidyalaya, Supaul, Bihar, where she excelled academically and in extracurricular activities, earning an award from the Honorable President of India.

She went on to crack some of the toughest and most competitive medical entrance exams in India including AIIMS, PGI, JIPMER, AIPMT, and BCECE, securing excellent ranks. Out of her deep respect and commitment to her home state, Bihar, she chose to pursue her M.B.B.S. and M.S. in Obstetrics and Gynecology at Patna Medical College and Hospital.

During her postgraduate training, Dr. Supriya independently managed thousands of patients with complex obstetric and gynecological cases, including high-risk pregnancies and surgical procedures. She became known for treating patients across all socioeconomic backgrounds, including many who had been refused care elsewhere in Bihar.

She further honed her skills during her Senior Residency at the renowned Darbhanga Medical College and Hospital, where she and her team performed numerous surgeries with efficient turnaround times and high patient recovery rates.

Dr. Supriya demonstrated expertise in managing various obstetric and gynecological medical conditions including eclampsia, gestational trophoblastic disease, infertility, tubal block, menstrual disorders, precocious puberty, breast diseases, and other infections.

In 2014, she launched her first healthcare venture, Shree Balaji Hospital, specifically focused on Obstetrics and Gynecology. This marked a major milestone in her career, empowering her to manage all types of cases—from routine to complex—including twin deliveries, septate uterus cases, eclampsia, pre-eclampsia, and breech presentations. She also handled a wide array of gynecological surgeries such as TAH, VH, laparoscopic tubectomy, oophorectomy, ovarian cystectomy, and vault prolapse repairs.

Dr. Supriya is also proficient in treating infertility through medical management and is experienced in handling cases involving molar pregnancy, various contraceptive methods, and other reproductive health issues.

After 11 years of extensive experience through her own hospital and other renowned institutions in Patna and Darbhanga, she launched her dream project Panacea Medicare Research Centre on 2nd February 2025, located at Manharanlal Muhallah, Khanka Chowk, Darbhanga.

Dr. Supriya currently serves as the CEO and Senior Consultant Obstetrician & Gynecologist at Panacea Hospital. With a nearly 100% success rate, she manages all types of cases, including routine, elective, emergency, and complex surgeries—round the clock.

Under her leadership, Panacea Medicare Research Centre operates with a full-time dedicated team comprising radiologists, pathologists, interventionists, duty doctors, nurses, and O.T. technicians.

Panacea Hospital and its team are always ready to welcome and serve patients with utmost dedication, compassion, and excellence in care.`,
    available: true,
  },
  {
    doctorId: "surya-narayan",
    name: "Dr. Surya Narayan",
    title: "Senior Consultant and Director",
    specialty: "Radiologist",
    email: "surya.narayan@panaceamedicare.com",
    phone: "+91 98765 43211",
    image: "/assets/doctor-2.jpg",
    qualifications: [
      "MBBS (PMCH Patna)",
      "MD Radiology (Gold Medalist – DMCH Darbhanga)",
    ],
    timetable: {
      days: "Saturday - Thursday",
      hours: "09:00 AM - 18:30 PM",
    },
    hospital: "Panacea Medicare",
    experience: "15+ Years",
    about: `Dr. Surya Narayan serves as the Senior Consultant Radiologist and Director at Panacea Medicare Research Centre, highlighting his clinical precision, academic brilliance, and compassionate patient care.

He completed his MBBS from Patna Medical College and Hospital (PMCH) and went on to pursue MD in Radio-Diagnosis from Darbhanga Medical College and Hospital (DMCH), where he graduated as a Gold Medalist.

His expertise covers Ultrasound, X-Ray, CT Scan, and other advanced imaging technologies, emphasizing his role in providing fast and accurate diagnostic reports for medical, surgical, and emergency cases.

As a key figure at Panacea Medicare Research Centre, he offers 24x7 in-house radiological support and collaborates with departments such as Obstetrics, Gynecology, Infertility, and Pediatrics, contributing to the efficient management of critical and high-risk cases.

Beyond clinical duties, he is involved in mentoring radiology trainees, optimizing imaging protocols, and advancing healthcare and medical education.`,
    available: true,
  },
  {
    doctorId: "dilip-kumar-sah",
    name: "Dr. Dilip Kumar Sah",
    title: "Senior Consultant",
    specialty: "Diabetologist & Cardiologist",
    email: "dilip.sah@panaceamedicare.com",
    phone: "+91 98765 43212",
    image: "/assets/doctor-3.jpg",
    qualifications: [
      "MBBS (PMCH Patna)",
      "MD (Medicine - PMCH Patna)",
    ],
    timetable: {
      days: "Saturday - Thursday",
      hours: "09:00 AM - 18:30 PM",
    },
    hospital: "Panacea Medicare",
    experience: "20+ Years",
    about: `Dr. Dilip Kumar Sah is a highly experienced Senior Consultant in Internal Medicine, and a leading Diabetologist and Cardiologist at Panacea Medicare Research Centre. He brings extensive expertise in managing complex cases related to diabetes, hypertension, cardiac diseases, and other chronic medical conditions.

He completed his MBBS and MD in Internal Medicine from the prestigious Patna Medical College and Hospital (PMCH). PMCH is one of the oldest and most reputed institutions in Bihar, and his strong academic foundation and clinical practice have made him a trusted physician in the region.

At Panacea, Dr. Dilip manages patients with non-communicable diseases, offering personalized care plans for diabetes management, cardiac risk reduction, lifestyle counseling and preventive healthcare. His calm demeanor, accurate diagnosis, and holistic treatment strategies have earned him the trust of countless patients and their families.

He works closely with other departments to ensure comprehensive care for patients undergoing surgery, pregnancy with medical complications, or pediatric cases with co-existing medical issues.

Dr. Dilip is also actively involved in community health awareness, preventive screenings, and educational sessions for chronic disease management, aligning with Panacea's vision of delivering holistic healthcare and promoting the well-being of the next generation.`,
    available: true,
  },
  {
    doctorId: "deepak-kumar-sah",
    name: "Dr. Deepak Kumar Sah",
    title: "Senior Consultant",
    specialty: "Laparoscopic & General Surgeon",
    email: "deepak.sah@panaceamedicare.com",
    phone: "+91 98765 43213",
    image: "/assets/doctor-1.jpg",
    qualifications: [
      "MBBS (PMCH Patna)",
      "MS (General Surgery - NMCH Patna)",
    ],
    timetable: {
      days: "Saturday - Thursday",
      hours: "09:00 AM - 18:30 PM",
    },
    hospital: "Panacea Medicare",
    experience: "18+ Years",
    about: `Dr. Deepak Kumar Sah is the Senior Consultant in Laparoscopic and General Surgery at Panacea Medicare Research Centre, Darbhanga, known for his surgical precision, compassionate care, and commitment to patient safety.

He completed his MBBS from Patna Medical College and Hospital (PMCH) and went on to pursue MS in General Surgery from Nalanda Medical College and Hospital (NMCH), Patna. With strong academic roots and rigorous surgical training, Dr. Sah has emerged as a trusted name in both routine and complex surgical procedures.

At Panacea, Dr. Deepak leads the General & Laparoscopic Surgery Unit, specializing in minimally invasive procedures such as laparoscopic appendectomy, cholecystectomy, hernia repair, and other abdominal surgeries. His approach ensures faster recovery, minimal post-operative pain, and shorter hospital stays for patients.

He is also skilled in performing emergency trauma surgeries, gastrointestinal procedures, and minor proctological surgeries, often in coordination with critical care and other specialty teams.

Dr. Sah is an advocate for safe surgical practices, evidence-based techniques, and patient-centered care. He is actively involved in surgical training, mentoring junior surgeons, and participating in clinical audits and surgical seminars to stay aligned with the latest advancements in the field.

With his dedication and expertise, Dr. Deepak Kumar Sah plays a key role in elevating the surgical services offered at Panacea Medicare Research Centre.`,
    available: true,
  },
  {
    doctorId: "rajeev-ranjan",
    name: "Dr. Rajeev Ranjan",
    title: "Senior Consultant",
    specialty: "Neonatologist & Pediatrician",
    email: "rajeev.ranjan@panaceamedicare.com",
    phone: "+91 98765 43214",
    image: "/assets/doctor-2.jpg",
    qualifications: [
      "MBBS (IMS BHU Varanasi)",
      "DCH (B R D Medical college Gorakhpur)",
      "DNB-1",
    ],
    timetable: {
      days: "Saturday - Monday, Wednesday - Thursday",
      hours: "09:00 AM - 18:30 PM",
    },
    hospital: "Panacea Medicare",
    experience: "12+ Years",
    about: `Dr. Rajeev Ranjan is a Senior Consultant Neonatologist and Pediatrician at Panacea Medicare Research Centre, Darbhanga. He brings a wealth of knowledge, compassion, and clinical excellence in the care of infants, children, and adolescents.

His education includes MBBS, DCH in Pediatrics from the prestigious Institute of Medical Sciences, Banaras Hindu University (IMS BHU), Varanasi and B R D Medical college Gorakhpur.

His specialized expertise is in Neonatal Intensive Care, pediatric emergencies, developmental disorders, and preventive child healthcare. He is highly respected for his gentle approach and accurate diagnosis in handling even the most delicate neonatal and pediatric cases.

At Panacea, he leads the NICU (Neonatal Intensive Care Unit) and Pediatric Department, offering 24x7 specialized care for newborns, preterm babies, and critically ill children, SAM baby.

He is instrumental in managing complex neonatal conditions, birth asphyxia, congenital disorders, Preterm baby, neonatal seizures, metabolic disorders, respiratory distress, and pediatric infection.

His work emphasizes not only curative treatment but also early diagnosis, vaccination, nutrition guidance, and parental counseling, ensuring a comprehensive and family-centered approach to child health.

He also plays an active role in medical education, training programs, and child health awareness camps, aligning with Panacea's mission of delivering holistic healthcare and promoting the well-being of the next generation.`,
    available: true,
  },
  {
    doctorId: "rajnikant-prasad",
    name: "Dr. Rajnikant Prasad",
    title: "Senior Consultant",
    specialty: "Pathologist",
    email: "rajnikant.prasad@panaceamedicare.com",
    phone: "+91 98765 43215",
    image: "/assets/doctor-3.jpg",
    qualifications: [
      "MBBS (DMCH Darbhanga)",
      "MD Pathology (IGIMS Patna)",
    ],
    timetable: {
      days: "Saturday - Thursday",
      hours: "09:00 AM - 18:30 PM",
    },
    hospital: "Panacea Medicare",
    experience: "16+ Years",
    about: `Dr. Rajnikant Prasad is a Senior Consultant Pathologist at Panacea Medicare Research Centre, Darbhanga, known for his clinical precision, academic excellence, and commitment to accurate diagnostic services.

He completed his MBBS from Darbhanga Medical College and Hospital (DMCH), Darbhanga, and went on to pursue MD in Pathology from Indira Gandhi Institute of Medical Sciences (IGIMS), Patna. With strong academic roots and rigorous training, Dr. Prasad has emerged as a trusted name in pathology and laboratory medicine.

At Panacea, Dr. Rajnikant leads the Pathology and Laboratory Department, offering comprehensive in-house diagnostic services including clinical pathology, histopathology, hematology, and cytopathology. His expertise ensures fast and accurate diagnostic reports for medical, surgical, and emergency cases.

As a key figure at Panacea Medicare Research Centre, he offers 24x7 in-house pathology support and collaborates with departments such as Obstetrics, Gynecology, Infertility, and Pediatrics, contributing to the efficient management of critical and high-risk cases.

He is dedicated to maintaining high standards in sample analysis, quality control, and report turnaround times. Beyond clinical duties, he is involved in continuous medical education, training pathology technicians, and advancing healthcare and medical education.`,
    available: true,
  },
  {
    doctorId: "abhijit",
    name: "Dr. Abhijit",
    title: "Resident Medical Officer",
    specialty: "Department of Neonatology",
    email: "abhijit@panaceamedicare.com",
    phone: "+91 98765 43216",
    image: "/assets/doctor-1.jpg",
    qualifications: [
      "MBBS (RD Gardi Medical College, Ujjain, Madhya Pradesh)",
    ],
    timetable: {
      days: "Monday - Sunday",
      hours: "24x7",
    },
    hospital: "Panacea Medicare",
    experience: "5+ Years",
    about: `Dr. Abhijit Bihari is the Resident Medical Officer in the Department of Neonatology at Panacea Medicare Research Centre, where he plays a pivotal role in the care and management of newborns, particularly in the Neonatal Intensive Care Unit (NICU).

He completed his MBBS from RD Gardi Medical College, Ujjain, Madhya Pradesh, and has since gained valuable experience working in the field of neonatology, assisting in the care of critically ill and premature infants. His dedication to newborn health and his compassionate approach to patient care have made him an invaluable member of the Panacea team.

Dr. Abhijit is involved in day-to-day clinical operations in the NICU, providing support in the diagnosis and treatment of neonatal conditions such as respiratory distress syndrome, infections, and birth asphyxia. He works closely with senior neonatologists and pediatricians to ensure that every infant receives the best possible care in their critical early days.

His commitment to continuous learning and excellence in neonatal care has made him a trusted healthcare provider for both families and medical staff at Panacea Medicare Research Centre.`,
    available: true,
  },
  {
    doctorId: "subodh-kumar",
    name: "Dr. Subodh Kumar",
    title: "Senior Consultant",
    specialty: "Anesthesiologist, Critical Care",
    email: "subodh.kumar@panaceamedicare.com",
    phone: "+91 98765 43217",
    image: "/assets/doctor-2.jpg",
    qualifications: [
      "MBBS (PMCH Patna)",
      "MD (Anesthesiology - DMCH Darbhanga)",
    ],
    timetable: {
      days: "Saturday - Thursday",
      hours: "09:00 AM - 18:30 PM",
    },
    hospital: "Panacea Medicare",
    experience: "14+ Years",
    about: `Dr. Subodh Kumar is a Senior Consultant in Anesthesiology and Critical Care at Panacea Medicare Research Centre, Darbhanga, emphasizing his role in patient safety during surgeries and managing critical cases.

He completed his MBBS from Patna Medical College and Hospital (PMCH) and MD in Anesthesiology from Darbhanga Medical College and Hospital (DMCH). He is described as a highly skilled anesthesiologist known for his calm precision and clinical acumen.

At Panacea, he heads the Anesthesia and Critical Care Unit, overseeing pre-operative, intra-operative, and post-operative patient care. His specializations include general and regional anesthesia, ICU management, emergency airway management, and critical care interventions (central lines, arterial cannulation, ventilator support).

He is involved in major and minor surgeries across departments like obstetrics, gynecology, general surgery, pediatrics, and laparoscopic procedures, ensuring safe anesthesia protocols and expert resuscitation.

He is actively involved in conducting emergency response drills and advancing perioperative care standards, highlighting his contribution to Panacea's reputation for handling complex medical and surgical emergencies.`,
    available: true,
  },
  {
    doctorId: "anjali-jha",
    name: "Dr. Anjali Jha",
    title: "Senior Consultant",
    specialty: "Anesthesiologist",
    email: "anjali.jha@panaceamedicare.com",
    phone: "+91 98765 43218",
    image: "/assets/doctor-3.jpg",
    qualifications: [
      "MBBS",
      "MD (Anesthesiology - DMCH Darbhanga)",
      "Ex-Junior Resident, AIIMS Patna",
    ],
    timetable: {
      days: "Saturday - Thursday",
      hours: "09:00 AM - 18:30 PM",
    },
    hospital: "Panacea Medicare",
    experience: "10+ Years",
    about: `Dr. Anjali Jha is a highly experienced and skilled Senior Consultant Anesthesiologist at Panacea Medicare Research Centre, recognized for clinical precision, patient-centered care, and calm efficiency in high-pressure surgical environments.

Her education includes MBBS and MD in Anesthesiology from DMCH, Darbhanga, described as a reputed medical institution in Bihar. Her experience as a Junior Resident at AIIMS Patna is mentioned, where she gained exposure to advanced and multidisciplinary anesthetic procedures.

Her role at Panacea involves providing safe anesthesia for routine and complex surgeries across departments including obstetrics, gynecology, general surgery, pediatrics, and laparoscopic interventions.

Her expertise covers regional and general anesthesia, pain management, ICU support, and perioperative & postoperative critical care. She is also involved in managing emergency resuscitations, ventilator care, and intervention-based anesthetic support during critical cases.

Her compassionate approach and strict adherence to patient safety protocols are highlighted as reasons she is a trusted and respected member of the hospital's core clinical team.

Beyond clinical duties, she contributes to training medical staff, supervising junior anesthesia doctors, and promoting best practices in anesthesia and surgical safety. Your comfort and care are our priority - Trust the hands of experience with Dr. Anjali Jha at Panacea Medicare Research Center.`,
    available: true,
  },
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    // Clear existing doctors
    await Doctor.deleteMany({});
    console.log("Cleared existing doctors");

    // Insert doctors
    const doctors = await Doctor.insertMany(doctorsData);
    console.log(`Inserted ${doctors.length} doctors`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding doctors:", error);
    process.exit(1);
  }
};

seedDoctors();

