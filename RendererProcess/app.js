const fs = require('fs');
const domPlayer = document.getElementById('player')

const dirInit = 'C:/musica'

var app = angular.module('app', [])

app.factory('archivosService', function(){

    return {
        archivosLista: function(ruta){
            var lista = []
            fs.readdirSync(ruta).forEach(function(element){
                var path = `${ruta}/${element}`
                var stat = fs.statSync(path)
                lista.push({
                    name: element,
                    path: path,
                    isdir: stat.isDirectory()
                })
            }, this)
            return lista
        }
    }
});

app.controller('mainController', function($scope, archivosService){
    $scope.lista = []
    $scope.msg = 'Hola Angular JS'
    $scope.Msg = 'Holy'
    $scope.directorio = dirInit
    $scope.pilaDirectorio = []
    $scope.pista = {}
    
    // Metodos
    $scope.enlistar = function(atras = false){
        $scope.lista = archivosService.archivosLista($scope.directorio)
        if(!atras) $scope.pilaDirectorio.push($scope.directorio)
    }
    $scope.eventEnlistar = function(evento){
        if(evento.keyCode === 13){
            $scope.enlistar()
        }
    }
    $scope.dblClickSelect = function(item){
        if(item.isdir){
            $scope.directorio = `${$scope.directorio}/${item.name}`
            $scope.enlistar()
        }else{
            var path = `${$scope.directorio}/${item.name}`
            //play
            console.log(`
    Path: ${path}
    Name: ${item.name}
            `)
            $scope.pista = {
                path: path,
                name: item.name
            }
        }
    }
    $scope.dblClickAtras = function(){
        $scope.pilaDirectorio.pop()
        $scope.directorio = $scope.pilaDirectorio[$scope.pilaDirectorio.length-1]
        $scope.enlistar(true)
    }

    // boot
    $scope.enlistar($scope.directorio)
    $scope.pilaDirectorio.push($scope.directorio)
})