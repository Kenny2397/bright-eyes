<template>

  <el-container>
    <el-header class="header">
      <h3>Drawflow visual programming</h3>
      <el-button type="primary" @click="CleanBoard">Clean Board</el-button>
      <el-button type="primary" @click="ModalSave">Save Drawflow</el-button>
      <el-button type="primary" @click="ModalList">List Drawflows</el-button>
      <el-button type="primary" @click="exportEditor">Export</el-button>
      <el-button type="warning" @click="RunProgram">Run Program</el-button>
    </el-header>
    <el-container class="container">
      <el-aside width="250px" class="column">
        <ul>
          <li v-for="n in listNodes" :key="n" draggable="true" :data-node="n.item" @dragstart="drag($event)"
            class="drag-drawflow">
            <div class="node" :style="`background: ${n.color}`">{{ n.name }}</div>
          </li>
        </ul>
      </el-aside>
      <el-main>
        <div id="drawflow" @drop="drop($event)" @dragover="allowDrop($event)"></div>
      </el-main>
    </el-container>
  </el-container>
  <!-- data es la información en json de todo el drawflow -->
  <div>{{ data }}</div>

  <!-- modal SaveDrawflow -->
  <el-dialog v-model="ActivateModalSave" title="Save Program" width="50%">

    <el-label for="identifier">Ingrese el nombre de su Drawflow:</el-label>
    <el-input name="identifier" v-model="drawflowIdentifier" placeholder="identifier"></el-input>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="SaveDrawflow">Save Program</el-button> &nbsp;
        <el-button type="warning" @click="ActivateModalSave = false">Cancel</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">Confirm</el-button> -->
      </span>
    </template>

  </el-dialog>

  <!-- modal List -->
  <el-dialog v-model="ActivateModalList" title="List Programs" width="50%">
    <el-form action="GetDrawflow" method="GET">

      <!-- <ul>
        <li v-for="drawflow, index in drawflows" :key="index">
          <div onClick="">
            {{drawflow.identifier}}
          </div>
        </li>
      </ul> -->

      <table className="table table-hover">
        <thead>
          <th>uid</th>
          <th>identifier</th>

        </thead>
        <tbody>
          <tr v-for="drawflow, index in drawflows" :key="index">
            <td>{{ index }}</td>
            <td>
              <a href="#">
                <div name="">{{ drawflow.identifier }}</div>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <input type="submit" value="Submit"> -->
    </el-form>
    <el-label for="identifier">Ingrese el nombreidentificador de Drawflow a obtener:</el-label>
    <el-input name="identifier" v-model="searchIdentifier" placeholder="identifier"></el-input>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="submit" @click="GetDrawflowByIdentifier">GET</el-button> &nbsp;
        <el-button type="warning" @click="ActivateModalList = false">Cancel</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">Confirm</el-button> -->
      </span>
    </template>


  </el-dialog>


  <!-- modal export -->
  <el-dialog v-model="dialogVisible" title="Export" width="50%">
    <span>Data:</span>
    <pre><code>{{ dialogData }}</code></pre>

    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button type="secondary" @click="saveDrawflow()">Save Program</el-button> &nbsp; -->
        <el-button type="warning" @click="dialogVisible = false">Cancel</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">Confirm</el-button> -->
      </span>
    </template>
  </el-dialog>

  <!-- modal Run Program -->
  <el-dialog v-model="modalExecuteProgram" title="Run Program" width="50%">
    <!-- <span>Program:</span> -->
    <span>Input:</span>
    <!-- <prism-editor class="my-editor" v-model="code" :highlight="" line-numbers></prism-editor> -->
    <!-- <code-highlight language="python">
      <pre>
        <p style="color:white;"> {{ pythonCode }}</p>
        
      </pre>
    </code-highlight> -->

    <span>Output:</span>
    <prism-editor class="my-editor" v-model="code" :highlight="highlighter" line-numbers></prism-editor>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="modalExecuteProgram = false">Cancel</el-button> &nbsp;
      </span>
    </template>
  </el-dialog>

</template>


<script >
// script setup es usado para simplificar y no es necesario export default 
import Drawflow from 'drawflow'
import styleDrawflow from 'drawflow/dist/drawflow.min.css'
import style from '../assets/style.css'
import { onMounted, shallowRef, h, getCurrentInstance, render, readonly, ref, computed } from 'vue'

// import Node1 from './nodes/node1.vue'
// import Node2 from './nodes/node2.vue'
// import Node3 from './nodes/node3.vue'

import Start from './nodes/Start.vue'
import Print from './nodes/Print.vue'
import Number from './nodes/Number.vue'
import Assignation from './nodes/Assignation.vue'
import Operation from './nodes/Operation.vue'
import IfElse from './nodes/IfElse.vue'
import For from './nodes/For.vue'

// import { useStore } from 'vuex'


// import Prism Editor
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles


export default {
  name: 'drawflow',
  components: {
    PrismEditor
  },
  setup() {
    const listNodes = readonly([
      {
        name: 'Start',
        color: 'gray',
        item: 'Start',
        input: 0,
        output: 1
      },
      {
        name: 'Print',
        color: 'orange',
        item: 'Print',
        input: 1,
        output: 0
      },
      {
        name: 'Number',
        color: 'red',
        item: 'Number',
        input: 1,
        output: 1
      },
      {
        name: 'Assignation',
        color: 'rebeccapurple',
        item: 'Assignation',
        input: 1,
        output: 1
      },
      {
        name: 'Operation',
        color: 'gray',
        item: 'Operation',
        input: 2,
        output: 1
      },
      {
        name: 'IfElse',
        color: 'green',
        item: 'IfElse',
        input: 1,
        output: 1
      },
      {
        name: 'For',
        color: 'gold',
        item: 'For',
        input: 2,
        output: 1

      }
    ])

    // drawflow variables config
    // var data = ref({})
    const editor = shallowRef({})
    const terminalVisible = ref(false)
    const dialogData = ref({})
    const terminalData = ref({})

    const drawflowIdentifier = ref("");

    /**
     * activators
     */

    const ActivateModalSave = ref(false)
    const ActivateModalList = ref(false)

    const dialogVisible = ref(false)
    const modalExecuteProgram = ref(false)

    //
    const drawflows = ref({});
    const searchIdentifier = ref('');

    // python Code

    const pythonCode = ref("");
    const outputPythonCode = ref("");
    const code = ref('print(Hello)');
    const dataObj = ref({});


    // drawflow start
    const Vue = { version: 3, h, render };
    const internalInstance = getCurrentInstance()
    internalInstance.appContext.app._context.config.globalProperties.$df = editor;

    // const store = useStore();

    function importData(data) {
      editor.value.clear();
      //       console.log(data)
      editor.value.import(data)
    }
    /**
     * activadores de modal
     */

    function ModalSave() {
      ActivateModalSave.value = true;
    }
    function ModalList() {
      ActivateModalList.value = true;

      try {
        fetch('http://localhost:5050/drawflows')
          .then(response => response.json())
          .then(response => {
            console.log(response);
            drawflows.value = response.getAll;
          })

      } catch (error) {
        console.error(error);
      }
    }

    /**=================================================
     * DRAWFLOW ACTIONS BUTTONS
     */
    // Clean Board
    function CleanBoard() {
      editor.value.clear()
    }

    /**
     * Save Drawflow -----------------------------------
     */
    async function CreateDrawflow(url, drawflowRequest) {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(drawflowRequest),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => console.log(res))
        .catch(error => console.log('Error!:', error));
    }

    function SaveDrawflow() {
      if (drawflowIdentifier.value === "") {
        alert("ingrese un nombre para el identificador");
        return;
      }

      /**
       * Get Drawflow data export
       */

      let EditorData = editor.value.export().drawflow.Home.data
      // console.log(EditorData)

      let arrayData = Object.values(EditorData)
      // console.log("**", arrayData)

      // console.log("---",drawflowIdentifier.value)
      let drawflowRequest = {
        identifier: drawflowIdentifier.value,
        data: arrayData
      }

      // console.log(drawflow)

      /**
       * Create drawflow API Request
       */
      let url = 'http://localhost:5050/new';

      // let responseCreate = await CreateDrawflow(url, drawflowRequest)
      CreateDrawflow(url, drawflowRequest)

      /**
       * Finalizando
       */
      ActivateModalSave.value = false;
      drawflowIdentifier.value = "";
      // console.log(drawflowIdentifier.value)
    }

    /**
     * List Drawflows ----------------------------------
     */

    const ConvertDataInverse = (data) => {
      let dataf = {};
      // console.log(data.query[0].data);
      data.query[0].data.map(node => {
        let id = node.id
        dataf[id] = node;
      })

      // console.log(dataObj);
      let dataObj = {
        drawflow: {
          Home: {
            data: dataf
          }
        }
      }
      console.log(dataObj);
      importData(dataObj)
    }

    const GetDrawflowByIdentifier = () => {
      fetch('http://localhost:5050/drawflow/' + searchIdentifier.value)
        .then(response => {
          // console.log(response);
          return response.json();
        })
        .then(res => {
          console.log(res);
          // convert data backend to data frontend
          ConvertDataInverse(res);
        })
        .catch(err => console.log(err))
    }
    /**
     * Export Editor -----------------------------------
     */
    function highlighter(code) {
      return highlight(code, languages.py); // languages.<insert language> to return html with markup
    }

    function exportEditor() {
      dialogData.value = editor.value.export();
      dialogVisible.value = true;
    }

    /**
     * Run Program   -----------------------------------
     */
    function RunProgram() {
      modalExecuteProgram.value = true;
      /**
       * Get Drawflow data export
       */
      let EditorData = editor.value.export().drawflow.Home.data
      // console.log(EditorData)

      let drawflowData = Object.values(EditorData)
      // console.log("**", drawflowData)

      function highlighter(x) {
        code.value = x
        return highlight(code.value, languages.py); // languages.<insert language> to return html with markup
      }

      async function ExecuteProgram(url, request) {
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(request),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => {
            console.log(res);
            return res.json();
            // GetRequest("http://localhost:5050/execute");
          })
          .then(res => {
            outputPythonCode.value = res;
            highlighter(res.Output);
            console.log(res)
          })
          .catch(error => console.error('Error!:', error));
      };

      // const GetRequest = async (url) => {
      //   try {
      //     const res = await fetch(url);
      //     console.log(res);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }

      const StringCodeGenerate = (data) => {
        let orderedNodes = [];
        let codeUseCases = "";

        /**
         * FUNCTIONS
         */
        const SearchStart = (drawflowData) => {
          const nodeStart = drawflowData.filter(node => node.name === "Start")
          // console.log(nodeStart[0])
          return nodeStart[0];
        }

        const getNodeById = (id) => {
          const node = drawflowData.filter(node => node.id === id)

          return node[0];
        }

        const getNodeCode = (name) => {
          switch (name) {
            case 'Print': return "0";
              break;

            case "Number": return "1";
              break;

            case "Assignation": return "2";
              break;

            case "Operation": return "3";
              break;

            case "IfElse": return "4";
              break;

            case "For": return "5";
              break;

            default: return false;
              break;
          }
        }
        /**
         * 
         */

        // ordenanado cadena
        // encontrar start
        const start = SearchStart(data);

        // console.log(start);

        orderedNodes.push(start);

        // encontrar nextnodeId

        // let nextNodeId = parseInt(start?.outputs?.output_1?.connections[0]?.node);
        // let nextNode = getNodeById(nextNodeId)

        // orderedNodes.push(nextNode);

        // console.log(nextNodeId)

        // let thisNode = nextNode;

        // console.log(thisNode);

        // nextNode again

        // nextNodeId = parseInt(thisNode?.outputs?.output_1?.connections[0]?.node);

        // console.log(nextNodeId)
        // nextNode = getNodeById(nextNodeId)

        // orderedNodes.push(nextNode);

        // console.log(orderedNodes)

        let isComplete = false;
        let thisNode = start;
        let nextNodeId = NaN;
        let nextNode = {};
        let nodeCode = "";

        while (!isComplete) {
          nextNodeId = parseInt(thisNode?.outputs?.output_1?.connections[0]?.node);

          if (isNaN(nextNodeId)) {
            isComplete = true;
            continue
          }

          nextNode = getNodeById(nextNodeId);

          nodeCode = getNodeCode(nextNode.name);

          codeUseCases = codeUseCases + nodeCode;

          orderedNodes.push(nextNode);

          thisNode = nextNode;
        }

        // console.log(orderedNodes, codeUseCases);

        return {
          orderedNodes,
          codeUseCases
        };

      }

      const GenerateStringPythonUseCases = ({ orderedNodes, codeUseCases }) => {
        let pythonCode = "";

        const fx10 = () => {
          let value = orderedNodes[1]?.data?.numbervalue
          // console.log(orderedNodes[1]);
          if (value === "") {
            console.log(value);
            return "valor de Number no ingresado"
          }
          pythonCode = pythonCode + "print(" + value + ")"

          return pythonCode;
        }



        switch (codeUseCases) {
          case '10':
            return fx10()
            break;

          default:
            break;
        }
      }

      let nodeObject = StringCodeGenerate(drawflowData)

      pythonCode.value = GenerateStringPythonUseCases(nodeObject)

      /**
       * API REQuest
       */

      let urlPythonCode = 'http://localhost:5050/run';

      let requestPythonCode = {
        pythonCode: pythonCode.value
      }

      ExecuteProgram(urlPythonCode, requestPythonCode);


      // GetRequest('http://localhost:5050/execute/' + pythonCode.value);
    }




    const drag = (ev) => {
      if (ev.type === "touchstart") {
        mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
      } else {
        ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
      }
    }
    const drop = (ev) => {
      if (ev.type === "touchend") {
        var parentdrawflow = document.elementFromPoint(mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
        if (parentdrawflow != null) {
          addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
          // store.dispatch('updateData', editor.value.export());
        }
        mobile_item_selec = '';
      } else {
        ev.preventDefault();

        var data = ev.dataTransfer.getData("node");
        addNodeToDrawFlow(data, ev.clientX, ev.clientY);
      }

    }
    const allowDrop = (ev) => {
      ev.preventDefault();
    }


    let mobile_item_selec = '';
    let mobile_last_move = null;

    function positionMobile(ev) {
      mobile_last_move = ev;
    }

    function addNodeToDrawFlow(name, pos_x, pos_y) {
      pos_x = pos_x * (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().x * (editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)));
      pos_y = pos_y * (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().y * (editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)));

      const nodeSelected = listNodes.find(ele => ele.item == name);
      editor.value.addNode(name, nodeSelected.input, nodeSelected.output, pos_x, pos_y, name, {}, name, 'vue');

    }



    /**
     *  En Montaje
     */
    onMounted(() => {
      // elements: list de node actives in left bar
      var elements = document.getElementsByClassName('drag-drawflow');

      // listener drag and drop in dashboard
      for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('touchend', drop, false);
        elements[i].addEventListener('touchmove', positionMobile, false);
        elements[i].addEventListener('touchstart', drag, false);
      }

      /**
       * Drawflow Create
       */
      const id = document.getElementById("drawflow");
      editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context);
      editor.value.start();

      /**
       * Register Nodes
       * editor.registerNode('name', component, props, options);
       */

      // editor.value.registerNode('Node1', Node1, {}, {});
      // editor.value.registerNode('Node2', Node2, {}, {});
      // editor.value.registerNode('Node3', Node3, {}, {});

      editor.value.registerNode('Start', Start, {}, {});
      editor.value.registerNode('Print', Print, {}, {});
      editor.value.registerNode('Number', Number, {}, {});
      editor.value.registerNode('Assignation', Assignation, {}, {});
      editor.value.registerNode('Operation', Operation, {}, {});
      editor.value.registerNode('IfElse', IfElse, {}, {});
      editor.value.registerNode('For', For, {}, {});



      /**
       * Import a drawflow data  or initial drawflow 
       */
      editor.value.import({
        "drawflow": {
          "Home": {
            "data": {
              "1": {
                "id": 1,
                "name": "Start",
                "data": {},
                "class": "Start",
                "html": "Start",
                "typenode": "vue",
                "inputs": {},
                "outputs": {
                  "output_1": {
                    "connections": [
                      {
                        "node": "3",
                        "output": "input_1"
                      }
                    ]
                  }
                },
                "pos_x": 91,
                "pos_y": 44
              },
              "2": {
                "id": 2,
                "name": "Print",
                "data": {},
                "class": "Print",
                "html": "Print",
                "typenode": "vue",
                "inputs": {
                  "input_1": {
                    "connections": [
                      {
                        "node": "3",
                        "input": "output_1"
                      }
                    ]
                  }
                },
                "outputs": {},
                "pos_x": 354,
                "pos_y": 229
              },
              "3": {
                "id": 3,
                "name": "Number",
                "data": {
                  "numbervalue": "23"
                },
                "class": "Number",
                "html": "Number",
                "typenode": "vue",
                "inputs": {
                  "input_1": {
                    "connections": [
                      {
                        "node": "1",
                        "input": "output_1"
                      }
                    ]
                  }
                },
                "outputs": {
                  "output_1": {
                    "connections": [
                      {
                        "node": "2",
                        "output": "input_1"
                      }
                    ]
                  }
                },
                "pos_x": 21,
                "pos_y": 234
              }
            }
          }
        }
      })

    })



    return {
      exportEditor,
      RunProgram,
      CleanBoard,
      listNodes,
      drag,
      drop,
      allowDrop,

      ModalSave,
      ModalList,
      ActivateModalSave,
      ActivateModalList,
      dialogVisible,
      modalExecuteProgram,

      terminalVisible,
      dialogData,
      terminalData,

      drawflows,
      searchIdentifier,

      pythonCode,
      outputPythonCode,
      code,
      dataObj,
      highlighter,

      drawflowIdentifier,
      GetDrawflowByIdentifier,
      CreateDrawflow,
      // newSchema,
      // executeProgram,
      SaveDrawflow,
      importData,

      // data
    }
  }

}

</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #494949;
}

.container {
  min-height: calc(100vh - 100px);
}

.column {
  border-right: 1px solid #494949;
}

.column ul {
  padding-inline-start: 0px;
  padding: 10px 10px;

}

.column li {
  background: transparent;
}

.node {
  border-radius: 8px;
  border: 2px solid #494949;
  display: block;
  height: 60px;
  line-height: 40px;
  padding: 10px;
  margin: 10px 0px;
  cursor: move;

}

#drawflow {
  width: 100%;
  height: 100%;
  text-align: initial;
  background: #2b2c30;
  background-size: 20px 20px;
  background-image: radial-gradient(#494949 1px, transparent 1px);

}
</style>