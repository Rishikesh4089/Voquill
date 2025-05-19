import { Note } from '../types';
import LANGUAGES from '../constants/Languages';

// Mock notes data for demo purposes
export const NOTES: Note[] = [
  {
    id: '1',
    title: 'Meeting Notes',
    content: 'आज की मीटिंग में हमने प्रोजेक्ट की स्थिति पर चर्चा की और अगले कदमों की योजना बनाई।',
    romanizedContent: 'Aaj ki meeting mein humne project ki sthiti par charcha ki aur agle kadmon ki yojana banayi.',
    language: LANGUAGES[0], // Hindi
    createdAt: '2023-06-15T10:30:00.000Z',
    updatedAt: '2023-06-15T10:45:00.000Z',
  },
  {
    id: '2',
    title: 'Shopping List',
    content: 'दूध, अंडे, ब्रेड, फल और सब्जियां खरीदनी हैं।',
    romanizedContent: 'Doodh, ande, bread, phal aur sabziyan kharidni hain.',
    language: LANGUAGES[0], // Hindi
    createdAt: '2023-06-16T14:20:00.000Z',
    updatedAt: '2023-06-16T14:25:00.000Z',
  },
  {
    id: '3',
    title: 'Recipe for Paneer Dish',
    content: 'पनीर टिक्का मसाला के लिए आवश्यक सामग्री: पनीर, टमाटर, प्याज, मसाले',
    romanizedContent: 'Paneer Tikka Masala ke liye avashyak samagri: paneer, tamatar, pyaaz, masale',
    language: LANGUAGES[0], // Hindi
    createdAt: '2023-06-17T19:10:00.000Z',
    updatedAt: '2023-06-17T19:20:00.000Z',
  },
  {
    id: '4',
    title: 'Travel Plans',
    content: 'पुणे से मुंबई जाने के लिए ट्रेन का समय देखना है और होटल बुक करना है।',
    romanizedContent: 'Pune se Mumbai jaane ke liye train ka samay dekhna hai aur hotel book karna hai.',
    language: LANGUAGES[0], // Hindi
    createdAt: '2023-06-18T09:45:00.000Z',
    updatedAt: '2023-06-18T10:00:00.000Z',
  },
  {
    id: '5',
    title: 'Birthday Party Ideas',
    content: 'मित्रों को आमंत्रित करें, केक ऑर्डर करें, सजावट की व्यवस्था करें।',
    romanizedContent: 'Mitron ko amantrit karen, cake order karen, sajavat ki vyavastha karen.',
    language: LANGUAGES[0], // Hindi
    createdAt: '2023-06-20T16:30:00.000Z',
    updatedAt: '2023-06-20T16:40:00.000Z',
  },
  {
    id: '6',
    title: 'Film Review',
    content: 'आजचा चित्रपट खूप छान होता. कथानक, अभिनय आणि संगीत उत्कृष्ट होते.',
    romanizedContent: 'Aajacha chitrapat khoop chhan hota. Kathanak, abhinay aani sangeet utkrusht hote.',
    language: LANGUAGES[1], // Marathi
    createdAt: '2023-06-22T21:15:00.000Z',
    updatedAt: '2023-06-22T21:25:00.000Z',
  },
  {
    id: '7',
    title: 'Project Deadline',
    content: 'અગત્યના પ્રોજેક્ટની સમયસીમા આવતા સોમવારે છે. બાકીના કામો પૂર્ણ કરવા જરૂરી છે.',
    romanizedContent: 'Agatyana project ni samayseema aavta somvare chhe. Baakina kaamo poorna karva jaruri chhe.',
    language: LANGUAGES[2], // Gujarati
    createdAt: '2023-06-24T11:50:00.000Z',
    updatedAt: '2023-06-24T12:00:00.000Z',
  },
];

export default NOTES;