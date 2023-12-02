import express from "express";
import { atualizaPedido, atualizaStatusPedido, criaPedido, deletaPedido, listaPedidos, listaPedidosId, totalPedidosCliente, totalPedidosProduto } from "./utils.js";
import { promises } from "fs";
const { readFile } = promises;

const pedidos = express.Router();

pedidos.get("/", async (_, res) => {
  try {
    const lista = await listaPedidos();

    res.status(200).send(lista);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

pedidos.get("/:id", async (req, res) => {
  try {
    const pedido = await listaPedidosId(req, res);

    res.status(200).send(pedido);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

pedidos.get("/totalpedidoscliente/:cliente", async (req, res) => {
  try {
    const totalPedido = await totalPedidosCliente(req, res);

    res.status(200).send( JSON.stringify( totalPedido ));
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

pedidos.get("/totalpedidosproduto/:produto", async (req, res) => {
  try {
    const totalPedido = await totalPedidosProduto(req, res);

    res.status(200).send( JSON.stringify( totalPedido ));
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

pedidos.post("/", async (req, res) => {
  try {
    const pedido = await criaPedido(req, res);

    res.status(200).send(pedido);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

pedidos.put("/", async (req, res) => {
  try {
    const pedido = await atualizaPedido(req, res);

    res.status(200).send(pedido);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

pedidos.patch("/:id/:entregue", async (req, res) => {
  try {
    const pedido = await atualizaStatusPedido(req, res);

    res.status(200).send(pedido);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

pedidos.delete("/:id", async (req, res) => {
  try {
    await deletaPedido(req, res);

    res.status(200).send("pedido excluido");
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});


export default pedidos;
