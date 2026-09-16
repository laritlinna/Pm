

import React, { useState } from 'react';import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
export default function App() {
  // Controle de Navegação das Telas e Eixos do Sistema Acadêmico (32 Telas)
  const [abaAtiva, setAbaAtiva] = useState('Home'); 
  const [moduloSelecionado, setModuloSelecionado] = useState(null); 
  const [subTela, setSubTela] = useState('Lista'); 

  // Mapeamento limpo contendo apenas as strings das entidades exigidas
  const entidades = [
    { nome: 'Alunos', tabela: 'alunos' },
    { nome: 'Professores', tabela: 'professores' },
    { nome: 'Turmas', tabela: 'turmas' },
    { nome: 'Cursos', tabela: 'cursos' },
    { nome: 'Disciplinas', tabela: 'disciplinas' },
    { nome: 'Matrículas', tabela: 'matriculas' },
    { nome: 'Responsáveis', tabela: 'responsaveis' },
    { nome: 'Avaliações', tabela: 'avaliacoes' },
    { nome: 'Coordenadores', tabela: 'coordenadores' },
    { nome: 'Boletins', tabela: 'boletins' }
  ];

  // Aciona a entrada em uma das áreas administrativas
  const entrarNoModulo = (modulo) => {
    setModuloSelecionado(modulo);
    setSubTela('Lista'); 
    setAbaAtiva('Modulo');
  };

  // Feedback nativo de salvamento de dados
  const salvarOperacao = (acao) => {
    Alert.alert("APP Scholar", `${acao} em [${moduloSelecionado}] realizado com sucesso!`);
    setAbaAtiva('Home');
  };

  return (
    <View style={styles.container}>
      {/* ==================== 1. HEADER FIXO INSTITUCIONAL ==================== */}
      <View style={styles.header}>
        {/* Adicionado o seu link do asset oficial no cabeçalho */}
        <Image 
          source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ac40945fb141309c105148bc2e2399b5' }}
          style={styles.logoMini}
        />
        <Text style={styles.headerTitulo}>APP Scholar</Text>
      </View>

      {/* ==================== 2. CORPO OPERACIONAL DINÂMICO ==================== */}
      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        
        {/* AREA A: HOME SCREEN (MENU PRINCIPAL EM GRID LIMPO) */}
        {abaAtiva === 'Home' && (
          <View style={styles.centralizar}>
            {/* Adicionado o seu link do asset oficial na tela central */}
            <Image 
              source={{ uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ac40945fb141309c105148bc2e2399b5' }} 
              style={styles.logoGrande}
            />
            <Text style={styles.titulo}>APP Scholar</Text>
            <Text style={styles.subtitulo}>Sistema Acadêmico</Text>

            <View style={styles.cardMenuContainer}>
              <Text style={styles.secaoTitulo}>Painel do Sistema Acadêmico</Text>
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                {entidades.map((eixo) => (
                  <TouchableOpacity 
                    key={eixo.nome} 
                    style={[styles.botaoItem, { width: '48%', borderColor: '#2C2C2E' }]} 
                    onPress={() => entrarNoModulo(eixo.nome)}
                  >
                    <Text style={[styles.textoItem, { color: '#E5E5EA', fontSize: 13, textAlign: 'center' }]}>
                      {eixo.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.botaoSobre} onPress={() => setAbaAtiva('Sobre')}>
              <Text style={styles.textoBotaoSobre}>Informações sobre o Sistema</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* AREA B: MÓDULOS DE SUB-TELAS (32 TELAS) */}
        {abaAtiva === 'Modulo' && moduloSelecionado && (
          <View style={styles.larguraTotal}>
            
            {/* SUB-TELA 1: CONSULTA */}
            {subTela === 'Lista' && (
              <View style={styles.gridItens}>
                <Text style={styles.tituloTela}>Consulta de {moduloSelecionado}</Text>
                <Text style={styles.subtituloTela}>Módulo para listar, pesquisar e excluir registros do banco MySQL.</Text>
                
                <TouchableOpacity style={styles.botaoMenu} onPress={() => setSubTela('Cadastro')}>
                  <Text style={styles.textoBotao}>Realizar Novo Cadastro</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoMenu} onPress={() => setSubTela('Editar')}>
                  <Text style={styles.textoBotao}>Editar Registro Selecionado</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.botaoMenu, { backgroundColor: '#FF6B6B' }]} 
                  onPress={() => Alert.alert("Excluir", "Registro removido com sucesso!")}
                >
                  <Text style={[styles.textoBotao, { color: '#000000' }]}>Excluir Registro</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* SUB-TELA 2: INSERÇÃO / CADASTRO */}
            {subTela === 'Cadastro' && (
              <View style={styles.gridItens}>
                <Text style={styles.tituloTela}>Cadastro de {moduloSelecionado}</Text>
                <Text style={styles.subtituloTela}>Insira os dados obrigatórios no formulário acadêmico.</Text>
                
                <TouchableOpacity style={styles.botaoMenu} onPress={() => salvarOperacao('Inclusão')}>
                  <Text style={styles.textoBotao}>Salvar e Armazenar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.botaoMenu, { backgroundColor: '#48484A' }]} onPress={() => setSubTela('Lista')}>
                  <Text style={[styles.textoBotao, { color: '#FFFFFF' }]}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* SUB-TELA 3: EDIÇÃO / ALTERAÇÃO */}
            {subTela === 'Editar' && (
              <View style={styles.gridItens}>
                <Text style={styles.tituloTela}>Alterar {moduloSelecionado}</Text>
                <Text style={styles.subtituloTela}>Modifique os atributos desejados da tabela selecionada.</Text>
                
                <TouchableOpacity style={styles.botaoMenu} onPress={() => salvarOperacao('Alteração')}>
                  <Text style={styles.textoBotao}>Confirmar Alteração</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.botaoMenu, { backgroundColor: '#48484A' }]} onPress={() => setSubTela('Lista')}>
                  <Text style={[styles.textoBotao, { color: '#FFFFFF' }]}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}

          </View>
        )}

        {/* AREA C: TELA SOBRE SCREEN */}
        {abaAtiva === 'Sobre' && (
          <View style={styles.centralizar}>
            <Text style={styles.tituloTela}>Sobre o Sistema</Text>
            <View style={styles.cardSobre}>
              <Text style={styles.textoSobre}>
                O <Text style={{ color: '#FF69B4', fontWeight: 'bold' }}>APP Scholar</Text> é uma plataforma acadêmica mobile focada na portabilidade operacional escolar técnica.{"\n\n"}
                Sua arquitetura gerencia os fluxos de dados de Alunos, Professores, Cursos, Disciplinas, Responsáveis, Matrículas, Turmas, Avaliações, Coordenadores e Boletins mapeando as 32 telas regulamentares de interface.
              </Text>
            </View>
            <Text style={styles.rodapeSobre}>Desenvolvimento de Sistemas • Etec 2026</Text>
          </View>
        )}

      </ScrollView>

      {/* ==================== 3. BARRA DE NAVEGAÇÃO INFERIOR FIXA ==================== */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBotao} onPress={() => setAbaAtiva('Home')}>
          <Text style={{ color: abaAtiva === 'Home' ? '#FFC5D3' : '#8E8E93', fontSize: 13, fontWeight: 'bold' }}>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBotao} onPress={() => setAbaAtiva('Modulo')}>
          <Text style={{ color: abaAtiva === 'Modulo' ? '#FFC5D3' : '#8E8E93', fontSize: 13, fontWeight: 'bold' }}>⚙️ Módulos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBotao} onPress={() => setAbaAtiva('Sobre')}>
          <Text style={{ color: abaAtiva === 'Sobre' ? '#FFC5D3' : '#8E8E93', fontSize: 13, fontWeight: 'bold' }}>ℹ️ Sobre</Text>
        </TouchableOpacity>
      </View>

      {/* BOTÃO VOLTAR FIXADO EM TELAS INTERNAS */}
      {abaAtiva !== 'Home' && (
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => setAbaAtiva('Home')}>
          <Text style={styles.textoBotaoVoltar}>Voltar ao Menu Inicial</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
  },
  header: {
    height: 100,
    backgroundColor: '#000000',
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 230, 230, 0.2)', 
    elevation: 5,
  },
  logoMini: {
    width: 38,
    height: 32,
    marginRight: 13,
  },
  headerTitulo: {
    color: '#E5E5EA', 
    fontSize: 14,
    fontWeight: '200',
    letterSpacing: 0.7,
  },
  conteudo: {
    padding: 30,
    alignItems: 'center',
  },
  centralizar: {
    alignItems: 'center',
    width: '90%',
  },
  larguraTotal: {
    width: '90%',
  },
  logoGrande: {
    width: 310,
    height: 150,
    marginTop: 10,
    marginBottom: 25,
  },
  titulo: {
    fontSize: 40,
    fontWeight: '400',
    color: '#C0C0C0',
    textAlign: 'center',
    letterSpacing: -0.9,
  },
  subtitulo: {
    fontSize: 15,
    color: '#FFC5D3', 
    textAlign: 'center',
    marginBottom: 28,
    fontWeight: '500',
  },
  cardMenuContainer: {
    backgroundColor: '#000000',
    width: '100%',
    borderRadius: 5,
    padding: 25,
    marginBottom: 10,
    borderWidth: 1,

borderColor: '#2C2C2E',
},
secaoTitulo: {
fontSize: 13,
fontWeight: '600',
color: '#8E8E93',
textTransform: 'uppercase',
letterSpacing: 3,
marginBottom: 19,
textAlign: 'center',
},
tituloTela: {
fontSize: 26,
fontWeight: '700',
color: '#8E8E93',
marginBottom: 6,
letterSpacing: -0.5,
textAlign: 'center',
},
subtituloTela: {
fontSize: 15,
color: '#8E8E93',
marginBottom: 24,
lineHeight: 20,
textAlign: 'center',
},
botaoMenu: {
backgroundColor: '#FFC5D3',
paddingVertical: 14,
borderRadius: 5,
width: '100%',
alignItems: 'center',
marginBottom: 15,
elevation: 3,
},
textoBotao: {
color: '#000000',
fontSize: 16,
fontWeight: '700',
},
botaoSobre: {
borderColor: '#2C2C2E',
borderWidth: 1.5,
paddingVertical: 14,
borderRadius: 5,
width: '100%',
alignItems: 'center',
marginTop: 10,
},
textoBotaoSobre: {
color: '#8E8E93',
fontSize: 15,
fontWeight: '600',
},
gridItens: {
width: '100%',
},
botaoItem: {
backgroundColor: '#1A1A1E',
borderWidth: 1.5,
padding: 14,
borderRadius: 5,
marginBottom: 15,
alignItems: 'center',
justifyContent: 'center',
},
textoItem: {
fontSize: 16,
fontWeight: '700',
},
cardSobre: {
backgroundColor: '#1A1A1E',
borderRadius: 5,
padding: 24,
borderWidth: 1,
borderColor: '#2C2C2E',
marginTop: 15,
width: '100%',
},
textoSobre: {
fontSize: 16,
color: '#D1D1D6',
textAlign: 'justify',
lineHeight: 26,
},
rodapeSobre: {
fontSize: 13,
color: '#8E8E93',
marginTop: 40,
fontWeight: '500',
textAlign: 'center',
},
tabBar: {
height: 70,
backgroundColor: '#1A1A1E',
flexDirection: 'row',
borderTopWidth: 1,
borderTopColor: '#2C2C2E'
},
tabBotao: {
flex: 1,
alignItems: 'center',
justifyContent: 'center'
},
botaoVoltar: {
backgroundColor: '#1A1A1E',
paddingVertical: 18,
alignItems: 'center',
justifyContent: 'center',
borderTopWidth: 1,
borderTopColor: '#2C2C2E',
},
textoBotaoVoltar: {
color: '#FFC5D3',
fontSize: 16,
fontWeight: '600',
},
});
