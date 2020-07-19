const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
//------------------------------PÚBLICOS--------------------------------//
      //*Home*//
      'home': './app/client/clientPub/clientHome/clientHome.js',

      //*Login*//
      'login': './app/client/clientPub/clientLogin/clientLogin.js',

      //*Registro*//
      'registro': './app/client/clientPub/clientRegistro/clientRegistro.js',

      //*Cartas*//
      'listadoCartasPub': './app/client/clientPub/clientCartasPub/clientCartasPub.js',

      //*Listas*//
      'listadoListasPub': './app/client/clientPub/clientListasPub/clientListasPub.js',
//----------------------------------------------------------------------//

      //*Usuarios*//
      'listaUsuarios': './app/client/clientUsuarios/clientUsuarios.js',
      
      //*Cartas*//
      'listadoCartas': './app/client/clientCartas/clientCartas.js',

      //*Listas*//
      'listadoListas': './app/client/clientListas/clientListas.js',
    },
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: [".js", ".jsx"]
          },
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.scss$/, 
          loader: [
            MiniCSSExtractPlugin.loader,
            "css-loader",
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCSSExtractPlugin()
    ]
};
