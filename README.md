# npmrc-switcher

Changes the current `.npmrc` file in use.

## Features

* Allows the use of a default file to fallback to.
* Allows you to set a different npm config per project and have it commited into the project's repo.
* Small library (~70 locs).
* Optionally supports auto-switching.
* Supports [bash] and [zsh].

## Anti-Features

* Does not hook `cd`.

## Install

    git clone git@github.com:BBC-News/npmrc-switcher.git
    cd npmrc-switcher
    npm install
    npm link

### Auto-Switching

If you want npmrc-switcher to auto-switch the current `.npmrc` file
between your different projects. Add this line to your `.bash_profile` or `.zshrc` or whatever it is you use.

``` bash
source /path/to/npmrc-switcher/lib/auto.sh
```

npmrc-switcher will check the current and parent directories for a `.npmrc` file.

### Default npmrc

If you wish to set a default npmrc file, simply create a file in your home directory called `.npmrc.default`.

## Uninstall

``` bash
npm uninstall npmrc-switcher
```

If you have the autoswitcher enabled you will need to remove that line from your [bash] or [zsh] profile.


## Credits

* [Integralist](https://github.com/integralist) for reviewing the code.
* [chruby](https://github.com/postmodern/chruby) for the idea behind this project.

[bash]: http://www.gnu.org/software/bash/
[zsh]: http://www.zsh.org/