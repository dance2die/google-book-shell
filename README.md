# Google Book Shell
Search [Google Books](https://books.google.com/) from command line window.

## Video of "How to Install & Use Google-Book-Shell"
[![How to Install & Use Google-Book-Shell](https://i.imgur.com/YtI0HA0.gif)](http://www.youtube.com/watch?v=XK4NgwJqw0s "Google Book Shell (NodeJS CLI) Demo
")

## How to Install
> npm install -g google-book-shell

If you have already installed it before (Thank you 😇), update it as shown below.
> npm update -g google-book-shell

Link to [Google-Book-Shell](https://www.npmjs.com/package/google-book-shell) NPM page.
_____

## How to Run 🏃‍
Type `gbs`
```bash
dance2die@LELOUCH c:\misc\sources
> gbs
google book search$
```
_____
## Usage
Type `help` for the list of commands
```bash
google book search$ help

  Commands:

    help [command...]  Provides help for a given command.
    exit               Exits application.
    search <book>      search for a book in Google Books
    open <number>      open # in searched book list
    view <number>      view detailed description of the book
    print              print searched books
```
_____
## Commands
### **search**
  - USAGE: `search <book name>` (book name is required).
  - ALIAS: `s`
  - DESCRIPTION: Searches for the book on Google Books.
  - If the name has a space, use a double/single quote around the name.
  - EXAMPLE
  ```bash
  google book search$ search "Grokking Algorithms"
  01: Grokking Algorithms
  02: Grokking Deep Learning
  03: Algorithms For Dummies
  04: Algorithms Unlocked
  05: Data Structures and Algorithms in Python
  06: Essential Algorithms
  07: The Algorithm Design Manual
  08: The CS Detective
  09: Algorithmic Puzzles
  10: Python Algorithms
  ```
### **open**
  - USAGE: `open [options] <number>` (number is required).
  - ALIAS: `o`
  - DESCRIPTION: Opens the searched book by the search result order in a *web browser*.
  - *NOTE*: Works only after **search** is run.
  - OPTIONS:

  ```bash
  Options:
      --help                        output usage information
      -a, --amazon                  open Amazon link
      -s, --strip-amazon-affiliate  strip affiliate query parameter
  ```
  - `--amazon` (or `-a` for short): Opens Amazon Web Link with affiliate info
      - Amazon's Product API requires a developer to sign up as an affiliate so this was unavoidable.
      - So I added the following option (`-s`) to strip out affiliate info if you choose to do so
      - This flag calls an Azure Function, which needs to wake up after some inactivity (Takes about 10~30 seconds). It will work faster after the first call.
      [![Example](https://i.imgur.com/7CnFDfe.gif)](https://youtu.be/htMZAkHSM94)
  - `--strip-amazon-affiliate` (or `-s` for short): Strip out affiliate info (Please support me by not using this flag 👼)
  - e.g.) 
      - `open 1`
      - `open -a 1` (or `open --amazon 1`)
      - `open -a -s 1` (or `open --amazon --strip-amazon-affiliate 1`)
      - YouTube walk-through

      [![How to Install & Use Google-Book-Shell](http://img.youtube.com/vi/_6tfVYkrJQU/0.jpg)](https://www.youtube.com/watch?v=_6tfVYkrJQU")
### **view**
  - USAGE: `view [number]` (number is optional).
  - ALIAS: `v`
  - DESCRIPTION: Displays the description of the searched book in *console* by search result order.
  - When `[number]` argument is missing, it will let user choose a book to view detail for
  - *NOTE*: Works only after **search** is run.
  - EXAMPLE **with** `[number]` argument.
  ![Example with `[number]` argument.](https://i.imgur.com/J5THPsJ.gif)

  - EXAMPLE **withOUT** `[number]` argument.
  ![Example withOUT `[number]` argument.](https://i.imgur.com/leUgfor.gif)
### **print**
  - USAGE: `print`
  - ALIAS: `p`
  - DESCRIPTION: Reprints searched book result
  - *Note*: Displays nothing when no search was performed previously.
  - EXAMPLE
  ```bash
  google book search$ print                    
  01: Grokking Algorithms                      
  02: Grokking Deep Learning                   
  03: Algorithms For Dummies                   
  04: Algorithms Unlocked                      
  05: Data Structures and Algorithms in Python 
  06: Essential Algorithms                     
  07: The Algorithm Design Manual              
  08: The CS Detective                         
  09: Algorithmic Puzzles                      
  10: Python Algorithms                        
  ```

## Demo using Aliases only
You can search, view details, and open browser much faster with aliases.
[![alias demo](https://i.imgur.com/4elrs5F.gif)](https://youtu.be/R1BYlWvktGs)
_____
## How to‍ 🏃‍ from the Source
1. Clone the source: 
`git clone https://github.com/dance2die/google-book-shell.git`
2. Install NPM packages/dependencies
`npm install` or `yarn`
3. Run it using `npm` or `yarn`
- `yarn start`

    --or--

- `npm run start`
_____
## TODO
- Add an autocomplete feature.
- Add aliases for existing commands.
- ? Compare prices from Google Books/Amazon/Barnes & Noble?
