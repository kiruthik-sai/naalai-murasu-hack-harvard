import './index.css';
import Crosswordfunc from './Crossword';


function CrosswordPage() {
  return (
<div class="container">
  <div class="frontpage">
    <div class="fp-cell fp-cell--1">
    <h3 class="poem_heading">Poems for YOU</h3>
      <a class='sidebar-item with-border'>
            <p class="poem">This world is full of love,<br/>And it's a miracle<br/>And we only have each other<br/>To show us what it means.<br/>We're falling in love<br/>And it's the only thing<br/>That keeps us going.<br/>Our love is true<br/>And we'll never change<br/>Our love is strong<br/>And will never die.</p>
            <p class="poem with-border"><br/>The future is a mystery<br/>It's a place we can't see<br/>But we can imagine what it might be<br/>It's a land of hope and dreams<br/>A place where anything is possible<br/>The future is waiting for us<br/>And it's going to be amazing</p>
          </a>
    </div>
    <div class="fp-cell fp-cell--2 scaled">
        <h1 class="crossword_heading">Crossword</h1>
      <Crosswordfunc/>
    </div>
 
  </div>
</div>




  );
}

export default CrosswordPage;
