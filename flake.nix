{
  description = "badumbatish.github.io development environment (Next.js)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            git
          ];

          shellHook = ''
            echo "badumbatish.github.io dev shell"
            echo "  node: $(node --version)"
            echo "  npm:  $(npm --version)"
            echo ""
            echo "  npm install    # first time"
            echo "  npm run dev    # dev server"
            echo "  npm run build  # static export"
            if [ -t 0 ]; then exec zsh; fi
          '';
        };
      });
}
