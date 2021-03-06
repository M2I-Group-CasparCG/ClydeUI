# Welcome to our ClydeUI project ! 

ClydeUI is a web interface for [CasparCG](http://casparcg.com/). It uses the [CasparCGAPI](https://github.com/M2I-Group-CasparCG/CasparCGAPI) backend. 
ClydeUI aims to offer a new way to use the playout server. Its main features are :

  * Scalable multiview channel
  * Easy input/output configuration
  * Multi-server support
  * Switch bar with program/preview mode
  * Down stream keyers
  * Media Players
  * Recorder

![ClydeUi_Composants](ressources/ClydeUI.png)

## Installation guide


### Prerequisites

Before going any further, make sure that you have both [NodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your system. 

We worked with the version 9 of NodeJS but all the other recent versions should work. 

You can download NodeJS by clicking on the following links :

  * [Linux based systems](https://nodejs.org/en/download/package-manager/).
  * [Windows systems](https://nodejs.org/en/download/).

Once the installation done, make sure everything is ready :

```
  node -v
  npm -v
```

### CasparCG Installation

1. Download the CasparCG Server 2.1.0 Beta 1 for Windows version [here](http://casparcg.com/download.html).

> Why a beta version ?
>
> The stable version of CasparCG is very limited regarding the OSC informations available. With the latest stable version, it would be impossible to get some very useful information (such as the recording time, or the time for which the current file has been playing).


2. Edit the CasparCG configuration file :
  * Have a least 3 channels
  * Have a predefined OSC client matching with the server on which you run the API (localhost).
  * If you need it, a demo configuration file is available [here](https://github.com/M2I-Group-CasparCG/CasparCGAPI/blob/master/utilities/API/caspar.config).

3. Launch CasparCG server


### API installation

1. Download the API sources
    ```bash
    git clone https://github.com/M2I-Group-CasparCG/CasparCGAPI.git
    ```
    Or manually download the archive [here](https://github.com/M2I-Group-CasparCG/CasparCGAPI.git) and extract it.
2. Install the dependencies

    In the CasparCGAPI folder : 
    ```bash
    npm install
    ```
3. O    nce everything is installed, just start the API with this command :
    ```bash
    npm start 
    ```

4. You should now see the current message in the nodeJS terminal :
    ```bash
    udp server listening on 0.0.0.0:5253
    Express server listening on port 3000
    ```

### ClydeUI installation

1. Download ClydeUI sources
    ```bash
    git clone https://github.com/M2I-Group-CasparCG/ClydeUI.git
    ```
    
    Or manually download the archive [here](https://github.com/M2I-Group-CasparCG/ClydeUI.git)  and extract it.

2. Install the depedencies

    In the ClydeUi folder :

    ```bash
    npm install
    ```

3. Start the web interface : 
    ```bash
    npm start
    ```

4. The web interface should now be accessible from http://127.0.0.1:4600.


    If you want the interface to be reachable from clients other than localhost, please add --host 0.0.0.0 to the start command :


    ```bash
    npm start --host 0.0.0.0
    ```

### Help needed ? Or bug detected ?

If you encountered any problem during the installation process, please create an [issue](https://github.com/M2I-Group-CasparCG/ClydeUI/issues/new/choose) ! We will be glad to help you. 
