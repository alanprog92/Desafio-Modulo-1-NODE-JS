import { promises } from "fs";
const { readFile, writeFile } = promises;

export const listaPedidos = async () => {
  const pedidosLista = JSON.parse(await readFile(global.filePath));
  return pedidosLista;
};

export const listaPedidosId = async (req, res) => {
  const pedidosLista = JSON.parse(await readFile(global.filePath));
  const pedido = pedidosLista.pedidos.filter(ped => ped.id == parseInt(req.params.id));
  return pedido;
};

export const totalPedidosCliente = async (req, res) => {
  const pedidosLista = JSON.parse(await readFile(global.filePath));
  const pedidos = pedidosLista.pedidos.filter(ped => ped.cliente == req.params.cliente && ped.entregue == true);

  let totalPedido = 0;
  pedidos.map(item=>{
    totalPedido = totalPedido + item.valor;
  })

  console.log(totalPedido)

  return totalPedido;
};

export const totalPedidosProduto = async (req, res) => {
  const pedidosLista = JSON.parse(await readFile(global.filePath));
  const pedidos = pedidosLista.pedidos.filter(ped => ped.produto == req.params.produto && ped.entregue == true);

  let totalPedido = 0;
  pedidos.map(item=>{
    totalPedido = totalPedido + item.valor;
  })

  console.log(totalPedido)

  return totalPedido;
};


export const criaPedido = async (req, res) => {

  try {
    const pedidosLista = JSON.parse(await readFile(global.filePath));

    const pedidoNew = req.body;
    pedidoNew.id = pedidosLista.nextId;
    pedidoNew.entregue = false;
    pedidoNew.timestamp = new Date()
    pedidosLista.nextId++;
  
    pedidosLista.pedidos.push(pedidoNew);
  
    // Escrevendo no arquivo
    await writeFile(global.filePath, JSON.stringify( pedidosLista ));
    return pedidoNew;
  
  } catch (error) {
    
  }


};

export const atualizaPedido = async (req, res) => {

  try {

    const pedidoEdit = req.body;
    const pedidosLista = JSON.parse(await readFile(global.filePath));

    const index = pedidosLista.pedidos.findIndex(a => a.id == pedidoEdit.id);
  
    pedidosLista.pedidos[index] = pedidoEdit;
  
    // Escrevendo no arquivo
    await writeFile(global.filePath, JSON.stringify( pedidosLista ));
    return pedidoEdit;
  
  } catch (error) {
    
  }


};

export const atualizaStatusPedido = async (req, res) => {

  try {

    const pedidosLista = JSON.parse(await readFile(global.filePath));

    const index = pedidosLista.pedidos.findIndex(a => a.id == req.params.id);
  
    pedidosLista.pedidos[index].entregue = req.params.entregue;
  
    // Escrevendo no arquivo
    await writeFile(global.filePath, JSON.stringify( pedidosLista ));
    return pedidosLista.pedidos[index];
  
  } catch (error) {
    
  }


};

export const deletaPedido = async (req, res) => {

  try {

    const pedidosLista = JSON.parse(await readFile(global.filePath));

    pedidosLista.pedidos = pedidosLista.pedidos.filter(ped => ped.id != parseInt(req.params.id));

    console.log(req.params)

    // Escrevendo no arquivo
    await writeFile(global.filePath, JSON.stringify( pedidosLista, null, 2 ));
  
  } catch (error) {
    
  }


};
