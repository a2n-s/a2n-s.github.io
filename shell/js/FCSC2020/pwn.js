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
        welcome: "FCSC - 2020 - Pwn\n",
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
        "Sandbox": `
        ---------------------------------------------------------------------
        Prompt:
        Your goal is to call the print_flag function to display the flag.
        ---------------------------------------------------------------------
        In the first part of this challenge, I made the mistake of starting directly on what I had learned, without looking around, which caused me to lose time.
        Indeed, I told myself that it had to be a basic jail, or you have to look for the function somewhere in the subclasses. So I started by entering several payloads:
        ().__class__.__base__.__subclasses__()
        I started searching in modules, builtins, without finding a single trace of the famous print_flag function.
        After several hours, I came back to 0. I tried to import the os module, and one of the errors caught my eye:

        Exception ignored in audit hook

        I hadn't seen this mistake before because I was only paying attention to the "Forbidden Action", a question comes to me very quickly: What is an audit hook?
        After several searches on the internet, I came across an article: https://www.python.org/dev/peps/pep-0578/, which talks about audiot hooks in python3.8.
        One of the sections of this article catches my eye, "Why not a sandbox ? ", the same name as the challenge, it can't be a coincidence.
        So I'm assuming we're dealing with an audit hook. When I read a little more about it, I come across articles about cpython, in other words, c code with python code.
        In these articles, he talks about a module used in these cases: The ctypes module, in python.
        So I try to import it, and succeed, it works, no forbidden action. So I decide to take an interest in the ctypes module, on one hand in the jail, and on the other hand in the python documentation.
        I'll talk about what I found in the documentation later, because it's not useful in the first part of this challenge.
        In the jail, I will list what ctypes contain. I use one of my "techniques" in the jail, which consists in storing the result of dir(ctypes) in a variable, and looping on this variable to have a better view on what ctypes.
        In ctypes we see the os module, that's great, let's get a shell!

        The payload to get a shell is : print(ctypes._os.execl("/bin/bash", "-i").read()), in fact, system is triggered by the audit hook, so we have to call a shell with another way.
        First command that I make : ls
        We see two files:
        
        -r-------- lib_flag.so
        -r-sr-x--- spython

        This is where I understand why I didn't see the print_flag function in the subclasses, as I did at the beginning. This function is contained in a .so file, in other words, c code.

        My cpython hypothesis is thus confirmed at that time, and explains the presence of functions allowing to interact with c in the ctypes module.
        Having the name of the library, I think, with the help of ctypes, I'll be able to load it in the binary, and then call the print_flag function. 
        After several searches, I find that the CDLL function takes as parameters a .so file to import it in a python script. Let's test this!
        Payload :
        ctypes.CDLL('lib_flag.so')

        Unfortunately, the audit hook prevents me from calling this function. So the jail won't be solved that easily.
        So I have a shell, and the name of the library, but I can't load it directly from the jail. A hypothesis to solve this challenge comes to my mind: 
        From the jail, I could call a shell command that creates a python script to load the lib_flag.so library, and call the print_flag() function. 
        Knowing that we have seen the presence of a suid (on spython), this hypothesis deserves to be verified.

        As you can imagine, it didn't work out...

        Here I draw two conclusions: The jail is spython, I can't "cat" the lib_flag.so file, nor load it into a script, so I'll have to dig deeper.
        Since I have no rights on the lib_flag.so file, I figure that this library must surely be loaded in the spython binary, because otherwise, the resolution of the challenge will become very complicated.
        So I use the ldd command, which allows me to see which libraries are loaded in a binary, hoping that lib_flag.so will appear, and guess what the lib_flag.so library is well loaded.

        From then on, I read a lot of documentation about ctypes and audit hooks, to help me better understand the jail.
        So now I have to focus on the spython binary. I try to use hexdump, strings, .. on it, unfortunately none of these commands are available on the server. To allow me a better analysis, I'm going to get the spython binary on my PC. 
        To do this, nothing could be simpler, we encode the spython file in base64, we store it in /tmp, we cat the file. Then, we paste the result in a website which allows the conversion from base64 to a file. 
        So I download it, and find myself with spython on my PC, so I'll be able to analyze it.
        First reflex, we will string the file, which will allow to see the strings that are present in the spython binary :

        lib_flag.so
        welcome
        libc.so.6
        setuid
        geteuid
        ....

        Here we can deduce a logical sequence of things:
        If we know a little bit about C++ libraries, we know that the libc.so library contains basic functions, like "geteuid" and "setuid". Given the result of our string command, this seems logical, the functions related to libc.so.6 are below. 
        So we can deduce something very important: the welcome function (which must surely display the message at the beginning of the jail) is part of lib_flag.so!

        Here, the principle will be a little technical to understand, and I will try to explain it as simply as possible:
        In Linux binaries (and in general), functions external to it are referenced by different systems, named respectively:
                - PLT: Procedure Linkage Table
                - GOT: Global Offset Table
        PLT is used to resolve addresses of libraries imported via stubs that "JUMP" in GOT. GOT is an array of pointers, each pointer pointing to a function. A pointer is a computer "tool" that allows to point (hence the name) to a location in memory. 
        This concept is a bit technical, and I won't talk about it in this write up, for those who are interested, I advise you to refer to the open classroom course which is very well done : https://openclassrooms.com/fr/courses/19980-apprenez-a-programmer-en-c/15417-a-lassaut-des-pointeurs
        Above, we saw that the Welcome() function was in the lib_flag.so library. We can largely deduce that the print_flag function is "after" (from a memory point of view) the Welcome() function.
        In our case, what interests us is the address of Welcome in the GOT, because this is where the pointer will be that will refer to the real location of Welcome in memory. To access this, we will use objdump, and we get the GOT adresse of welcome : 0x4098 !

        One thing we have to pay attention to is that we have analyzed the spython binary in a static way, i.e. the addresses we have retrieved are actually offsets from the address base of the program once it is mapped into memory. 
        In other words, on the server, the address of the Welcome pointer in the GOT is not 0x4098, but the spython base address plus 0x4098.

        Once again, I will try to explain the principle of a basic address in a very popular way, so that beginners in this kind of challenge can understand. The base address of a program is the base address at which it is launched. As you know, a program will be assigned an address when it starts, and all its instructions and dependencies as well. 
        All of these will be "in sequence" in memory. The base address is therefore the first address at which the program was started.
        Under linux, the base address of a program can be found in: /proc/$PID/maps, where $PID is the process number of the program.
        Now that everything is explained, let's get back to our challenge and our precious print_flag function. My goal now is to get the base address of the spython binary.

        First hypothesis :
        Thanks to my shell, I will be able to get the spython PID, and go cat /proc/$PID/maps to get its base address. To get its PID, I know a very handy command: pidof, which returns the PID of what is passed to it in parameters, but this didn't work.
        Is this a reading right problem ? The answer is no, i've the right on /proc/$PID/maps to read the file :

        -r--r--r-- /proc/$PID/maps

        Knowing that the open() functions are forbidden by the audit hook, it will be necessary to go through one of the ctypes functions.

        I'll spare you all the research work I've done to find the right function, but, for those who would like to know, I've gone through most of the modules, functions, ... in ctypes. 
        But, one thing caught my attention: ctypes.__loader__.get_data()

        I try and it works, I retrieve the spython maps, and so its base address.
        Let's call the Welcome() function !

        So, knowing the base address and the address of welcome, we build our payload : 
        got = int(ctypes.__loader__.get_data("../../../../proc/self/maps").decode().split("-")[0], 16) + 0x4098

        To be done, we will point a first pointer to a second pointer to get its value which will be the address of Welcome.
        Here, I have read a lot of documentation on ctypes to know how to do this, especially for the cast (changing the type of a variable into another one) from an address into a pointer. 
        To do this, we will use the following command:

        
        p = ctypes.cast(got, ctypes.POINTER(ctypes.c_int64))

        Last step, we will have to succeed in creating a function with ctypes, which, as a parameter, will take a void type function. (we can easily deduce that the Welcome and print_flag methods are of type void because they only display text).
        We will use the following payload : 

        functype = ctypes.CFUNCTYPE(ctypes.c_void_p)
        func = functype(hex(p.contents))
        func()
        
        And guess what, we call the Welcome function: 

        We you will be able to call the print_flag function ?
        51

        Now we just have to call the print_flag function. To do so, we will go by trial and error. I know it wasn't the best way to do it, but I'd rather do it to make sure we don't make a mistake.
        This is where we see the interest of generating the address of the first pointer in a line! After several tries, I come to the conclusion that the print_flag function is 0x14 further in memory than Welcome.

        Our final payload is :

        got = int(ctypes.__loader__.get_data("../../../../proc/self/maps").decode().split("-")[0], 16) + 0x4098
        p = ctypes.cast(got, ctypes.POINTER(ctypes.c_int64))
        functype = ctypes.CFUNCTYPE(ctypes.c_void_p)
        func = functype(hex(p.contents)+0x14)
        func()

        And we finally get the flag : 
        FCSC{55660e5c9e048d988917e2922eb1130063ebc1030db025a81fd04bda75bab1c3}
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
        (typeof user === "string" && typeof host === "string") && (this.completePrompt = user + "@" + host + ":~/writeups/fcsc2020/pwn/" + (root ? "#" : "$"));
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
