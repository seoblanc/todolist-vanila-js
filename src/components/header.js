class Header {
  constructor(){

  }

  addItem(value) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    this.generateIndex(todos)
    localStorage.setItem('todos', value)
  }

  generateIndex(todos) {
    return todos.length + 1
  }

  render() {
    const title = document.createElement('h1');
    const input = document.createElement('input');
    const button = document.createElement('button');

    title.innerText = 'TO DO LIST!';
    button.addEventListener('click', this.addItem(input.value));
  }
}

export default Header;