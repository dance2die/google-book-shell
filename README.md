# Google Book Shell

## Video of "How to Install & Use Google-Book-Shell"
[![How to Install & Use Google-Book-Shell](http://img.youtube.com/vi/LgxErGTCB-g/0.jpg)](http://www.youtube.com/watch?v=LgxErGTCB-g "Google Book Shell (NodeJS CLI) Demo
")

## How to Install
`npm install -g google-book-shell`

Link to [Google-Book-Shell](https://www.npmjs.com/package/google-book-shell) NPM page.

## How to Run
Type `gbs`
```bash
dance2die@LELOUCH c:\misc\sources
> gbs
google book search$
```

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

## Commands
1. **search**: `search <book name>` (book name is required).
    - Description: Searches for the book on Google Books.
    - If the name has a space, use a double/single quote around the name.
    - Example
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
2. **open**: `open <number>` (number is required).
    - Description: Opens the searched book by the search result order in a *web browser*.
    - *NOTE*: Works only after **search** is run.
    - e.g.) open 1
3. **view**: `view <number>` (number is required).
    - Description: Displays the description of the searched book in *console* by search result order.
    - *NOTE*: Works only after **search** is run.
    - Example
    ```bash
    google book search$ view 2                                       
    Title: Grokking Deep Learning                                    
    Subtitle:                                                        
    Authors: Andrew Trask                                            
    Publisher: Manning Publications                                  
    Published Date: 2017-03-31                                       
    ISBN 10: 1617293709                                              
    ISBN 13: 9781617293702                                           
    Page Count: 325                                                  
    Categories: Computers                                            
    description: Artificial Intelligence is the most exciting technol
    rtificial Intelligence systems out there. Grokking Deep Learning 
    PI of some library or framework, readers will actually understand
    Book in PDF, Kindle, and ePub formats from Manning Publications. 
    ```
4. **print**: `print`
    - Description: Reprints searched book result
    - *Note*: Displays nothing when no search was performed previously.
    - Example
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

## How to Run from the Source
1. Clone the source: 
`git clone https://github.com/dance2die/google-book-shell.git`
2. Run it using `yarn start`

## TODO
- Open Amazon page (`open` opens Google Book page by default)
    - open --amazon (or -a) <number>
