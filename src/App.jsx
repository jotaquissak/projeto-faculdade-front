import { forwardRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Snackbar, TextField, Box, Tab, Accordion, AccordionSummary, AccordionDetails, Typography, Button, Dialog, AppBar, Toolbar, IconButton, CircularProgress, Slide, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import CurrencyInput from "react-currency-input-field";
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';


const api = "http://localhost:8080/"

const Carregamento = () => {
  return(
    <Box sx={{ display: 'flex', width: "100%", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress />
    </Box>
  )
}

const Cabecalho = () => {

  const [value, setValue] = useState('1');
  const [produtos, setProdutos] = useState()
  const [tarefas, setTarefas] = useState()

  useEffect(() => {
    getProdutos()
    getTarefas()
  }, [])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getProdutos = async () => {
    try{
      const req = await axios.get(`${api}listar-produto`).then((res) => {
      setProdutos(res.data)
    })}
    catch(err){
      console.log(err)
    }
  }
  const getTarefas = async () => {
    try{
      const req = await axios.get(`${api}listar-tarefa`).then((res) => {
      setTarefas(res.data)
    })}
    catch(err){
      console.log(err)
    }
  }

  const [openSuccessful, setOpenSuccessful] = useState()
  const [openEdit, setOpenEdit] = useState()
  const [openUnsuccessful, setOpenUnsuccessful] = useState()
  const [openDelete, setOpenDelete] = useState()

  const handleClose = () => {
    setOpenSuccessful(false)
    setOpenEdit(false)
    setOpenUnsuccessful(false)
    setOpenDelete(false)
  }

  const handleAlert = (e) => {
    if(e.type === "post"){
      setOpenSuccessful(true)
    } else if(e.type === "put"){
      setOpenEdit(true)
    } else if(e.type === "delete"){
      setOpenDelete(true)
    } else{
      setOpenUnsuccessful(true)
    }

    if(value === '1'){
      getProdutos()
    } else{
      getTarefas()
    }

    // e = ''
  }

  return(
    <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "grid", gridTemplateColumns: "90fr 10fr" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab icon={<LocalGroceryStoreRoundedIcon /> } disabled />
              <Tab label="Produtos" value="1" />
              <Tab label="Tarefas" value="2" />
            </TabList>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
              <FullScreenDialog value={value} onClose={(e) => {
              handleAlert(e)
            }}/>
            </div>
          </Box>
          <TabPanel value="1">
            <Acordeao dados={produtos} value={value} onClose={(e) => {
              handleAlert(e)
            }}/>
            <Snackbar open={openSuccessful} autoHideDuration={1500} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Criado com sucesso
              </Alert>
            </Snackbar>
            <Snackbar open={openUnsuccessful} autoHideDuration={1500} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Error
              </Alert>
            </Snackbar>
            <Snackbar open={openEdit} autoHideDuration={1500} onClose={handleClose}>
              <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                Editado com sucesso
              </Alert>
            </Snackbar>
            <Snackbar open={openDelete} autoHideDuration={1500} onClose={handleClose}>
              <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                Excluido com sucesso
              </Alert>
            </Snackbar>
            
            
          </TabPanel>
          <TabPanel value="2">
            <Acordeao dados={tarefas} value={value} onClose={(e) => {
              handleAlert(e)
            }}/>
            
            <Snackbar open={openSuccessful} autoHideDuration={1500} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Criado com sucesso
              </Alert>
            </Snackbar>
            <Snackbar open={openUnsuccessful} autoHideDuration={1500} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Error
              </Alert>
            </Snackbar>
            <Snackbar open={openEdit} autoHideDuration={1500} onClose={handleClose}>
              <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                Editado com sucesso
              </Alert>
            </Snackbar>
            <Snackbar open={openDelete} autoHideDuration={1500} onClose={handleClose}>
              <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                Excluido com sucesso
              </Alert>
            </Snackbar>

          </TabPanel>
        </TabContext>
      </Box>
  )
}

const Acordeao = ({ dados, value, onClose = () => {} }) => {

  const [produtos, setProdutos] = useState()
  const [tarefas, setTarefas] = useState()

  const setPadrao = () => {
    if(value === '1'){
      setProdutos(dados)
    } else{
      setTarefas(dados)
    }
  }

  useEffect(() => {
    setPadrao()
  }, [dados])

  return(
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gridGap: "5%" }}>
      {value !== '2' ?
        [!!produtos ? produtos.map((res) => (
          <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: "98%", display: "block", overflow: "hidden" }}>{res.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ display: "grid", gridTemplateColumns: "4.5fr 4.5fr 1fr" }}>
              <div className="price" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: "98%", display: "block", overflow: "hidden" }}>R$ {(res.price).toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</div>
              <div className="quantity" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: "98%", display: "block", overflow: "hidden" }}>Estoque: {(res.quantity).toLocaleString("pt-BR")}</div>
              <div className="icons" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <FullScreenDialog tipo="Editar" dados={res} value={value} onClose={(e) => {
                  onClose(e)}}/>
                <AlertDialogSlide nome={res.name} text="Ao deletar o produto seu nome, preço e estoque serão excluídos da base de dados" type="produto" id={res.id} onClose={(e) => {
                  onClose(e)
                }}/>
              </div>
              
            </Typography>
          </AccordionDetails>
        </Accordion>
          )) : <Carregamento />]
        : 
        [!!tarefas ? tarefas.map((res) => (
          <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: "98%", display: "block", overflow: "hidden" }}>{res.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ display: "grid", 
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", 
            gridTemplateRows: "1fr 1fr 1fr",
            gridTemplateAreas: 
            `
            "text text text text text text text text icons"
            "price clientName clientName clientName clientName initialDate initialDate finalDate finalDate"
            `
            }}>
              <div className="price" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: "98%", display: "block", overflow: "hidden", gridArea: "price" }}>R$ {res.price}</div>
              <div className="icons" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridArea: "icons" }}>
                <FullScreenDialog tipo="Editar" dados={res} value={value} onClose={(e) => {
                  onClose(e)}}/>
                <AlertDialogSlide nome={res.name} text="Ao deletar a tarefa seu nome, preço, cliente, datas e descrição serão excluídos da base de dados" type="tarefa" id={res.id} onClose={(e) => {
                  onClose(e)
                }}/>
              </div>
              <div className="text" style={{ gridArea: "text", whiteSpace: "nowrap", textOverflow: "ellipsis", width: "98%", display: "block", overflow: "hidden" }}>{res.text}</div>
              <div className="finalDate" style={{ gridArea: "finalDate" }}>Entrega: {new Date(res.finalDate).toLocaleDateString('pt-BR')}</div>
              <div className="initialDate" style={{ gridArea: "initialDate" }}>Iniciado: {new Date(res.initialDate).toLocaleDateString('pt-BR')}</div>
              <div className="clientName" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: "98%", display: "block", overflow: "hidden", gridArea: "clientName" }}>{res.clientName}</div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        )) : <Carregamento />]
        }
      </div>
  )
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ tipo, dados, value, onClose = () => {} }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  return (
    <div>
      {tipo === "Editar" ? <EditIcon onClick={handleClickOpen} style={{cursor: "pointer", color: "#4db4f8"}} /> : <AddIcon onClick={handleClickOpen} style={{cursor: "pointer", color: "#4db4f8"}} />}
      <Dialog
        fullScreen
        open={open}
        onClosing={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar sx={{ display: "grid", gridTemplateColumns: "99fr 1fr" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Typography variant="h4" component="div">
                {!!tipo ? tipo : "Adicionar"}
              </Typography>
            </div>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Formulario dados={dados} value={value} onClose={(e) => {
          if(!!e){
            if(e.code === 200 || e.code === 201){
              onClose(e)
              handleClose()
            }
          } else {
            let f = {code: "", type: ""}
            onClose(f)
            // handleClose()
          }
        }}/>
      </Dialog>
    </div>
  );
}


const Formulario = ({ dados, value, onClose = () => {} }) => {

  const [valor, setValor] = useState("")
  const [quantidade, setQuantidade] = useState("")

  const CurrencyInputCustom = ({ inputRef, onChange, ...props }) => {
    return (
      <CurrencyInput
        {...props}
        maxLength={9}
      />
    );
  };

  

  const [nomeTarefaProduto, setNomeTarefaProduto] = useState()
  const [dataEntrega ,setDataEntrega] = useState()
  const [dataInicial, setDataInicial] = useState()
  const [nomeCliente, setNomeCliente] = useState()
  const [texto, setTexto] = useState()

  const optionsFormatDate = {
    day:"2-digit",
    month:"2-digit",
    year:"numeric",
  }
  
  const setPadrao = () => {
    if(!!dados) {
      setNomeTarefaProduto(dados.name)
      setValor(dados.price)
      if(value === '2'){
        setNomeCliente(dados.clientName)
        setTexto(dados.text)
        setDataInicial(dados.initialDate)
        setDataEntrega(dados.finalDate)
      } else{
        setQuantidade(dados.quantity)
      }
    } else{
      const data = new Date()
      let format = data.toLocaleDateString('en-US', optionsFormatDate)
      setDataInicial(format)
    }
  }
  
  const handleEnviar = async() => {
    if(value !== '2'){
      if(!!dados){
        const config = {
          "id": dados.id,
          "name": nomeTarefaProduto,
          "price": valor,
          "quantity": quantidade
        }
        try{
          const url = `${api}editar-produto`
          const req = await axios.put(url, config)
          return {code: req.status, type: "put"}
        } catch(err){
          console.log(err)
        }
      } else{
        const config = {
          "name": nomeTarefaProduto,
          "price": valor,
          "quantity": quantidade
        }
        try{
          const url = `${api}criar-produto`
          const req = await axios.post(url, config)
          return {code: req.status, type: "post"}
        } catch(err){
          console.log(err)
        }
      }
    } else{
      if(!!dados){
        const config = {
          "id": dados.id,
          "name": nomeTarefaProduto,
          "text": texto,
          "clientName": nomeCliente,
          "initialDate": dataInicial,
          "finalDate": dataEntrega,
          "price": valor
        }
        try{
          const url = `${api}editar-tarefa`
          const req = await axios.put(url, config)
          return {code: req.status, type: "put"}
        } catch(err){
          console.log(err)
        }
      } else{
        const config = {
          "name": nomeTarefaProduto,
          "text": texto,
          "clientName": nomeCliente,
          "initialDate": dataInicial,
          "finalDate": dataEntrega,
          "price": valor
        }
        try{
          const url = `${api}criar-tarefa`
          const req = await axios.post(url, config)
          return {code: req.status, type: "post"}
        } catch(err){
          console.log(err)
        }
      }
    }
  }


  const handleChamarEnvio = async() => {
    const req = await handleEnviar()
    onClose(req)
  }

  useEffect(() => {
    setPadrao()
  }, [])

  return(<>
      {value !== '2' ? 
      <div style={{ display: "grid", gridTemplateColumns: "1fr", margin: "6% 20%", gridGap: "30%" }}>
      <TextField id="outlined-basic" label="Nome do produto" variant="filled" defaultValue={!!dados ? dados.name : ''} onChange={(e) => {setNomeTarefaProduto(e.target.value)}}/>
      <TextField id="outlined-basic" label="Preço" variant="filled"
      InputProps={{
        inputComponent: CurrencyInputCustom,
        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
      }}
      onBlur={(e) => {
        const regexRemoveAll = /\D+/g;
        const regexDecimal = /(\d)(\d{2})$/;
        let value = e.target.value
        if(value.includes(",")){
          value = value.replace(regexRemoveAll, "")
          value = value.replace(regexDecimal, "$1.$2")
          setValor(value)
        } else{
          value = value.replace(regexRemoveAll, "")
          setValor(value)
        }
      }} defaultValue={!!valor ? `${valor}` : null} 
      />
      <TextField id="outlined-basic" label="Quantidade" variant="filled"
      InputProps={!!dados ? { 
        inputComponent: CurrencyInputCustom,
        startAdornment: <InputAdornment position="start"></InputAdornment>,
      } : { 
        inputComponent: CurrencyInputCustom,
      }}
      onBlur={(e) => {
        const regexRemoveAll = /\D+/g;
        const regexDecimal = /(\d)(\d{2})$/;
        let value = e.target.value
        if(value.includes(",")){
          value = value.replace(regexRemoveAll, "")
          value = value.replace(regexDecimal, "$1.$2")
          setQuantidade(value)
        } else{
          value = value.replace(regexRemoveAll, "")
          setQuantidade(value)
        }
      }} defaultValue={!!quantidade ? `${quantidade}` : null}/>
      <Button onClick={handleChamarEnvio} variant="contained" sx={{ height: "131.886%"}}>Enviar</Button> 
      </div> : <div style={{ display: "grid", gridTemplateColumns: "1fr", margin: "3% 20% 0", gridGap: "7%" }}>
      <TextField id="outlined-basic" label="Nome da tarefa" variant="filled" defaultValue={!!dados ? dados.name : ''} onChange={(e) => {setNomeTarefaProduto(e.target.value)}}/>
      <TextField
        id="outlined-basic"
        label="Texto da tarefa"
        multiline
        variant="filled"
        rows={2}
        maxRows={4}
        defaultValue={!!dados ? dados.text : ''} 
        onChange={(e) => {setTexto(e.target.value)}}
      />
      <TextField id="outlined-basic" label="Nome do cliente" variant="filled" defaultValue={!!dados ? dados.clientName : ''} onChange={(e) => {setNomeCliente(e.target.value)}}/>
      <TextField id="outlined-basic" label="Preço" variant="filled"
      InputProps={{
        inputComponent: CurrencyInputCustom,
        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
      }}
      onBlur={(e) => {
        const regexRemoveAll = /\D+/g;
        const regexDecimal = /(\d)(\d{2})$/;
        let value = e.target.value
        if(value.includes(",")){
          value = value.replace(regexRemoveAll, "")
          value = value.replace(regexDecimal, "$1.$2")
          setValor(value)
        } else{
          value = value.replace(regexRemoveAll, "")
          setValor(value)
        }
      }} defaultValue={!!valor ? `${valor}` : null} 
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          {!!dados ? <DateField label="Data de entrega" variant="filled" format="DD/MM/YYYY" defaultValue={dayjs(dados.finalDate)} onChange={(e) => {
            let date = new Date(e)
            let format = date.toLocaleDateString('en-US', optionsFormatDate)
            setDataEntrega(format)}}/> : <DateField label="Data de entrega" variant="filled" format="DD/MM/YYYY" onChange={(e) => {
            let date = new Date(e)
            let format = date.toLocaleDateString('en-US', optionsFormatDate)
            setDataEntrega(format)}}/>}
      </LocalizationProvider>

      <Button onClick={handleChamarEnvio} variant="contained" sx={{ height: "131.886%"}}>Enviar</Button>
      </div> }
      </>)
}

const AlertDialogSlide = ({ nome, text, type, id, onClose = () => {} }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async() => {
    try{
      const req = await axios.delete(`${api}deletar-${type}/${id}`)
      return { code: req.status, type: "delete"}
    } catch(err){
      console.log(err)
    }
  }

  const handleChamarDelete = async() => {
    const req = await handleDelete()
    onClose(req)
    handleClose(req)
  }

  return (
    <div>
      <DeleteIcon onClick={handleClickOpen} sx={{ color: "#f03636", cursor: "pointer" }} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Deseja deletar ${nome}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleChamarDelete}>Deletar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function App() {

  return (
    <div className="App">
      <Cabecalho />
    </div>
  );
}

export default App;