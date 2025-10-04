//load lesson
const lesson = ()=>{
  fetch('https://openapi.programming-hero.com/api/levels/all')
  .then(res=>res.json())
  .then(data=> lessonName(data.data))
 
}
lesson()

const loadWord = (id)=>{
  const url = (`https://openapi.programming-hero.com/api/word/${id}`)
  fetch(url).then(res=>res.json()).then(data=>wordDetils(data.data))
}

//display lessons
const lessonName = (ele)=>{
  const id = document.getElementById('lesson')
  id.innerHTML="";
  ele.forEach(element => {
    id.innerHTML +=`
    <div>
    <button id="btn-${element.level_no}" onclick="lessonData(${element.level_no})" class="btn btnColor btn-outline btn-primary"><i class="fa-solid fa-book"></i> lesson ${element.level_no}</button>
    </div>
    `
  });
}

const lessonData = (id) =>{
  const url = (`https://openapi.programming-hero.com/api/level/${id}`)
  fetch(url)
  .then(res=>res.json())
  .then(data=> {
    removeColor()
    const click = document.getElementById(`btn-${id}`)
    click.classList.add('color')
    word(data.data)
  })
}
const removeColor =()=>{
  const removebtn = document.querySelectorAll('.btnColor')
removebtn.forEach(ele=> ele.classList.remove('color'))
}

const word = (word)=>{
  const id =document.getElementById('words')
  id.innerHTML="";
  if(word.length === 0){
    id.innerHTML+=`
    <div class="col-span-full">
          <div class="text-center  space-y-4  ">
          <p class="text-blue-400 text-lg ">আপনি এখনো কোন lesson নেই</p>
          <h1 class="text-3xl font-bold">পরবর্তী
           Lesson Select করুন।</h1>
        </div>
    </div>
    `
    return;
  }
  word.forEach(element => { 
    const {word,meaning,pronunciation} = element
    id.innerHTML+=`
    <div class="bg-white pb-3 md:py-10 w-auto h-[200px] rounded-xl"  onclick="modal(${element.id})" >
      <div class="text-center space-y-4">
      <h1>${word ? word:'word not found'}</h1>
      <h3>Meaning /Pronounciation</h3>
      <h2>${meaning ? meaning: 'meaning not found'} / ${pronunciation}</h2>
      <div class="flex justify-between mx-5 pb-5">
        <h1 onclick="loadWord(${element.id})"><i class="fa-solid fa-circle-exclamation"></i></h1>
        <h1 onclick="pronounceWord('${pronunciation}')"><i class="fa-solid fa-volume-high"></i></h1>
      </div>
      </div>
    </div>
    `
  });
}

const wordDetils = (word)=>{
  const details = document.getElementById('modal')
  details.innerHTML=""
  details.innerHTML+=`
 <div>
 <h1 class="text-3xl font-semibold">${word.word} (${word.pronunciation}) </h1>
 <h3 class="text-2xl font-semibold my-3">meaning</h3>
 <h2 class="text-2xl ">${word.meaning ? word.meaning : 'not found'}</h2>
 <h3 class="text-2xl my-3 font-semibold">Example</h3>
 <p>${word.sentence}</p>
 <h1 class="text-2xl my-3">সমার্থক শব্দ গুলো</h1>
 <div> ${showSynonyms(word.synonyms)}</div>
 </div>
  `
 document.getElementById('modal_1').showModal();
}

const showSynonyms = (name)=>{
  const element = name.map(ele=> `<span class="bg-slate-300 p-3">${ele}</span>`)
  return element.join(" ")
}

//volume functionality
 function pronounceWord(word) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-GB'; // English
      window.speechSynthesis.speak(utterance);
      console.log(window.speechSynthesis.getVoices());
    }

const spinner = (spin) =>{
  if(spin == true){
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('words').classList.add('hidden')
  }
  else{
    document.getElementById('spinner').classList.add('hidden')
    document.getElementById('words').classList.remove('hidden')
  }
}

//search functionality
document.getElementById('search').addEventListener("click", ()=>{
  const input = document.getElementById('type');
  const getInputValue = input.value.toLowerCase();
  fetch('https://openapi.programming-hero.com/api/words/all')
  .then(res=>res.json())
  .then(data=>{
    const datas = data.data;
    const words = datas.filter(word => word.word.toLowerCase().includes(getInputValue))
    word(words)
  })
})