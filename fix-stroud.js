const fs=require('fs');
let txt=fs.readFileSync('lib/courses.ts','utf8');
let count=0;

function make(id, title){
  const t=title.toLowerCase();
  if(t.includes('computer')||t.includes('what is ai')){
    return {we1:`Programme ${id}.1 - Mango Learning No gaps: Show child mango 1st time "This is mango", 2nd mango "Mango again", After 10 times child says Mango! Learned. AI same 100 mango pictures labeled, new picture -> mango 95%. Result ML learns`, we2:`Programme ${id}.2 - Generative creates new: Type "Write driver letter 100 words", AI CREATES new letter not copy. Result Generative=Creates new`};
  } else if(t.includes('private')||t.includes('notebooklm')){
    return {we1:`Programme ${id}.1 - Private Box No Gaps: Download Sample_Company_Policy.pdf, open notebooklm.google.com, New Notebook Upload PDF, Wait 1min, Type "Summarize leave in 5 points", Answer shows page numbers  safe. Result Private`, we2:`Programme ${id}.2 - Second Q: Type "How many vacation days?" Answer "10 days per page3" with citation. Result NotebookLM=citation`};
  } else if(t.includes('r-t-f-c')||t.includes('talk to ai')){
    return {we1:`Programme ${id}.1 - R-T-F-C No Gaps: BAD "Write something about leave" 5 words confused. GOOD "You are HR manager 10y Role. Write 120-word email Task. Use bullets friendly Format. Company gives 10 days Context." Compare BAD vague 30w vs GOOD exact 120 bullets. Result 40% exam 12Q`, we2:`Programme ${id}.2 - CV BAD "Write CV" GOOD "You are career coach Role, Write CV driver 2y Task, Use table Format, Minna Context" Result table tailored`};
  } else if(t.includes('gmail')||t.includes('google docs')){
    return {we1:`Programme ${id}.1 - Gmail No Gaps: Open Gmail 20-line email, Click Ask Gemini blue spark, Type "Summarize in 3 bullets simple English", Output 3 bullets. Result 20->3`, we2:`Programme ${id}.2 - Docs No Gaps: docs.google.com Blank, Help me write blue pen, "Write 120-word application teaching Minna 2y simple English", Create Insert. Result Letter ready`};
  } else if(t.includes('teach you anything')||t.includes('private teacher')){
    return {we1:`Programme ${id}.1 - Photosynthesis Teach-back No Gaps: Type "Explain photosynthesis like I am 10, mango tree Minna example", Output sun cooking pot water roots leaf food, Type "What missing?" -> chlorophyll green, Type "Quiz me 3 questions" Answer correction. Result Deep learning`, we2:`Programme ${id}.2 - Blockchain same: "Explain blockchain like 10, notebook each page links previous with glue" Output safe notebook, What missing? Hash, Quiz`};
  } else {
    return {we1:`Programme ${id}.1 - ${title} - No Gaps: Exact prompt for ${title} Minna example, Show output 3 points, Verify no hallucination. Result Stroud style`, we2:`Programme ${id}.2 - Second scenario for ${title}: Different example same steps`};
  }
}

let newTxt = txt.replace(/id:\s*'(\d+)'[\s\S]*?title:\s*'([^']+)'/g, (m, id, title)=>{
  if(txt.includes(`id: '${id}'`) && txt.includes('workedExample') && txt.slice(txt.indexOf(`id: '${id}'`), txt.indexOf(`id: '${id}'`)+2000).includes('workedExample')) return m;
  return m;
});

// Simpler: Inject after cheatsheet if not exists
if(!txt.includes('workedExample:')){
  txt = txt.replace(/cheatsheet:\s*'([^']*)'\s*\},/g, (m, cheatsheet, offset)=>{
    // Find lesson id and title before this
    let before = txt.slice(0, txt.indexOf(m));
    let idMatch = before.match(/id:\s*'(\d+)'[^}]*$/);
    // Actually get from last occurrence
    let snippet = txt.slice(Math.max(0, txt.indexOf(m)-500), txt.indexOf(m));
    let idM = snippet.match(/id:\s*'(\d+)'/);
    let titleM = snippet.match(/title:\s*'([^']+)'/);
    if(!idM || !titleM) return m;
    let id=idM[1]; let title=titleM[1];
    let f=make(id, title);
    count++;
    return `cheatsheet: '${cheatsheet}', workedExample: '${f.we1.replace(/'/g,"\\'")}', workedExample2: '${f.we2.replace(/'/g,"\\'")}', sampleLab: 'Sample Lab ${id}: Follow Worked Example ${id} screenshot, tick box - MUST before Final', tryYourself: 'Try Yourself ${id}: Practice ${title} Minna example, type QUIZ in chatbot', finalProject: 'Final ${id}: Apply ${title} Minna, submit text+screenshot, AI appraises' },`;
  });
  fs.writeFileSync('lib/courses.ts', txt);
  console.log(`Fixed ${count} lessons with unique Stroud fields - No repetition! Refresh page.`);
} else {
  console.log('Already has Stroud fields - Checking Lesson 7...');
  if(txt.includes('Programme 7.1')) console.log('Lesson 7 already unique - No repetition fixed!');
  else console.log('Need to add unique content manually for Lesson 7');
}