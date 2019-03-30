import React, { Component } from 'react';
import {GlobalInputConnect} from 'global-input-react';
import InputWithLabel from './components/input-with-label';

import {styles} from './styles';
const textContent={
    title:"Send Message Example (Workflow example)",
    githuburl:"https://github.com/global-input/send-message-example",
}


class App extends Component {


    initWorkflowState(props){
      this.workflow={
        steps:{
          transferContact:{
                render:this.renderBusinessContact.bind(this),
                buildState:state=>{
                  return{step:"transferContact", connected:false};
                }
          },
          messageForm:{
                render:this.renderMessageForm.bind(this),
                buildState:state=>{
                      return{
                            step:"messageForm",
                            firstName:"",
                            lastName:"",
                            email:"",
                            phone:"",
                            message:"",
                            connected:true
                      };
                }
          },
          sendingMessage:{
                render:this.renderSending.bind(this),
                buildState:state => Object.assign({}, state,{step:"sendingMessage",connected:false})
          },
          messageSent:{
                render:this.renderMessageSent.bind(this),
                buildState:state => Object.assign({}, state,{step:"messageSent",connected:false})
          },
          error:{
                render:this.renderErrorMessage.bind(this),
                buildState:(state, errorMessage)=>Object.assign({}, state,{step:"error",connected:false, error:errorMessage})
          }
        },
        render(name, styles){
            var matched=this.steps[name];
            if(matched){
                return matched.render(styles);
            }
            else{
              return null;
            }
        }

       };
     }

     renderBusinessContact(styles){
            return(<div style={styles.help}>
               Press the 'Continue' button on your mobile to continue
             </div>
           );
     }
    renderMessageForm(styles){
      return(
        <React.Fragment>
              <div style={styles.fieldContainer}>
                <InputWithLabel label="First Name" id="first_name" type="text"
                   value={this.state.firstName}
                   onChange={value=>{
                     this.setFirstName(value);
                     this.mobile.setFirstName(value);
                   }
                   }/>
              </div>

              <div style={styles.fieldContainer}>
                <InputWithLabel label="Last Name" id="last_name" type="text"
                   value={this.state.lastName}
                   onChange={value=>{
                     this.setLastName(value);
                     this.mobile.setLastName(value);
                   }
                   }/>
              </div>

              <div style={styles.fieldContainer}>
                <InputWithLabel label="Email" id="email" type="text"
                   value={this.state.email}
                   onChange={value=>{
                     this.setEmail(value);
                     this.mobile.setEmail(value);
                   }
                   }/>
              </div>

              <div style={styles.fieldContainer}>
                <InputWithLabel label="Phone" id="phone" type="text"
                   value={this.state.phone}
                   onChange={value=>{
                     this.setPhone(value);
                     this.mobile.setPhone(value);
                   }
                   }/>
              </div>

              <div style={styles.fieldContainer}>
                <InputWithLabel label="Message" id="message" type="textarea"
                   value={this.state.message}
                   onChange={value=>{
                     this.setMessage(value);
                     this.mobile.setMessageContent(value);
                   }
                   }/>
              </div>
              <div style={styles.help}>Operate on your mobile to send message</div>


        </React.Fragment>
        );
    }

    renderSending(styles){
      return(<div style={styles.help}>
              Sending...
            </div>
          );
    }
    renderMessageSent(styles){
      return(<div style={styles.details}>
                <div style={styles.title}>Message Sent...</div>
                  <div style={styles.row}>
                    <div style={styles.label}>First Name:</div>
                    <div styles={styles.fieldValue}>{this.state.firstName}</div>
                  </div>
                  <div style={styles.row}>
                    <div style={styles.label}>Last Name:</div>
                    <div styles={styles.fieldValue}>{this.state.lastName}</div>
                  </div>
                  <div style={styles.row}>
                    <div style={styles.label}>Email:</div>
                    <div styles={styles.fieldValue}>{this.state.email}</div>
                  </div>
                  <div style={styles.row}>
                    <div style={styles.label}>Phone:</div>
                    <div styles={styles.fieldValue}>{this.state.phone}</div>
                  </div>
                  <div style={styles.row}>
                    <div style={styles.label}>Message:</div>
                    <div styles={styles.fieldValue}>{this.state.message}</div>
                  </div>

            </div>
          );
    }
    renderErrorMessage(styles){
      return(<div style={styles.help}>
              {this.state.error}
            </div>
          );
    }

    constructor(props){
        super(props);
        this.initWorkflowState();
        this.state=this.workflow.steps.transferContact.buildState();
        this.mobile.init(props);
        this.mobile.uiForSaveCompanyContactInfo(props);
    }

    initForMessageSenderForm(){
      var initData={
                action:"input",
                dataType:"form",
                form:{
                    id:"###email###@me",
                    title:"Sending a Message",
                    label:"contacts",
                    fields:[]
                }
      };
      const first_name={
              id:"first_name",
              type:"text",
              label:"First Name",
              value:"",
              operations:{
                  onInput:fistName=>this.setFirstName(fistName)
              }
      };
      initData.form.fields.push(first_name);
      this.mobile.setFirstName=value=>{
          this.mobile.sendMessage(value,first_name.id);
      }


      const last_name={
              id:"last_name",
              type:"text",
              label:"Last Name",
              value:"",
              operations:{
                  onInput:lastName=>this.setLastName(lastName)
              }
      };
      initData.form.fields.push(last_name);
      this.mobile.setLastName=value=>{
          this.mobile.sendMessage(value,last_name.id);
      }


      const email={
              id:"email",
              type:"text",
              label:"Email",
              value:"",
              operations:{
                  onInput:email=>this.setEmail(email)
              }
      };
      initData.form.fields.push(email);

      this.mobile.setEmail=value=>{
          this.mobile.sendMessage(value,email.id);
      }


      const phone={
              id:"phone",
              type:"text",
              label:"Phone",
              value:"",
              operations:{
                  onInput:phone=>this.setPhone(phone)
              }
      };
      initData.form.fields.push(phone);

      this.mobile.setPhone=value=>{
          this.mobile.sendMessage(value,phone.id);
      }

      const message={
              type:"text",
              label:"Message",
              value:"",
              nLines:5,
              operations:{
                  onInput:message=>this.setMessage(message)
              }
      };
      initData.form.fields.push(message);




      const cancelButton={
              label:"Cancel",
              type:"button",
              viewId:"footer",
              operations:{
                  onInput:()=>{
                        this.mobile.disconnect();

                  }
              }
      };
      initData.form.fields.push(cancelButton);

      const sendButton={
              label:"Send",
              type:"button",
              viewId:"footer",
              operations:{
                  onInput:this.sendMessage.bind(this)
              }
      };
      initData.form.fields.push(sendButton);
      this.mobile.changeInitData(initData);
      this.setState(this.workflow.steps.messageForm.buildState());
    }



    setFirstName(firstName){
      this.setState(Object.assign({}, this.state,{firstName}));
    }
    setLastName(lastName){
      this.setState(Object.assign({}, this.state,{lastName}));
    }
    setEmail(email){
      this.setState(Object.assign({}, this.state,{email}));
    }
    setPhone(phone){
      this.setState(Object.assign({}, this.state,{phone}));
    }
    setMessage(message){
      this.setState(Object.assign({}, this.state,{message}));
    }




    render(){

      return(
        <div style={styles.container}>

          <div style={styles.title}>
              {textContent.title}
          </div>
          <div style={styles.topControl}>
                <span style={styles.githuburl}>
                    <a href={textContent.githuburl} target="_blank">{textContent.githuburl}</a>
                </span>
          </div>
          <GlobalInputConnect mobileConfig={this.mobile.config}
                ref={globalInputConnect =>this.mobile.globalInputConnect=globalInputConnect}
                connectingMessage="Connecting...."
                connectedMessage="Scan with Global Input App" reconnectOnDisconnect={true}>
                {this.workflow.render(this.state.step, styles)}
            </GlobalInputConnect>



        </div>
      );
    }

    sendMessage(){
          this.mobile.disconnect();
          this.setState(this.workflow.steps.sendingMessage.buildState(this.state));
          if(this.props.sendMessage){
              this.props.sendMessage(this.state).then(()=>{
                  this.setState(this.workflow.steps.messageSent.buildState());
              }).catch(error=>{
                  console.error(error);
                  this.setState(this.workflow.steps.error.buildState(this.state,"Error:"+error));
              });
          }
          else{
              setTimeout(()=>{
                  this.setState(this.workflow.steps.messageSent.buildState(this.state));
              },1000);
          }
    }
    /****************************All the Mobile UI interfaces are defined below ***********/

    mobile={
          globalInputConnect:null,
          config:null,
          disconnect:()=>{
              if(this.mobile.globalInputConnect){
                  this.mobile.globalInputConnect.disconnectGlobaInputApp();
              }
          },
          sendMessage:(message, fieldid)=>{
                if(this.mobile.globalInputConnect){
                      this.mobile.globalInputConnect.sendInputMessage(message,null,fieldid);
                }
          },
          addField:(field, form)=>{
                const findex=form.fields.length;
                var setMobileFieldFunction=value=>{
                    if(this.mobile.globalInputConnect){
                        this.mobile.globalInputConnect.sendInputMessage(value,findex);
                    }
                };
                form.fields.push(field);
                return setMobileFieldFunction;
          },
          init:(props)=>{
                this.mobile.config={
                      url:props.url,
                      apikey:props.apikey,
                      securityGroup:props.securityGroup,
                      initData:null,
                      onSenderConnected:()=>{

                              this.setState(Object.assign({},this.state,{connected:true}));
                      },
                      onSenderDisconnected:()=>{
                          this.setState(Object.assign({}, this.state,{connected:false}));
                      }
                 };
          },
          setInitData:initData=>{
                this.mobile.config.initData=initData;
                if(this.mobile.globalInputConnect){
                        this.mobile.globalInputConnect.changeInitData(initData);
                }
          },
          uiForSaveCompanyContactInfo:props=>{
                  var initData={
                        action:"input",
                        dataType:"form",
                        form:{
                              id:"###company_name###@iterative",
                              title:"Our Contact Details",
                              label:"contacts",
                              fields:[]
                        }
                  };
                  var companyname={
                        id:"company_name",
                        type:"text",
                        label:"Company Name",
                        value:"Iterative Solution"

                  };
                  this.mobile.addField(companyname,initData.form);

                  var companyAddress={
                        id:"address",
                        label:"Address",
                        type:"text",
                        nLines:5,
                        value:"Iterative Solution Limited \n Kemp House \n \n 152-160 \n City Road\n London EC1V 2NX"
                  };
                  this.mobile.addField(companyAddress,initData.form);

                  var phone={
                        id:"phone",
                        label:"Phone",
                        type:"text",
                        value:"020 3290 6278"
                  };
                  this.mobile.addField(phone,initData.form);


                  var email={
                        id:"email",
                        label:"Email",
                        type:"text",
                        value:"info@iterativesolution.co.uk"
                  };
                  this.mobile.addField(email,initData.form);

                  var info={
                      type:"info",
                      value:["Please press the \"Save\" button to save our contact info, and then press the \"Continue\" button below to send a message to us"],
                  };
                  this.mobile.addField(info,initData.form);

                  var cancelButton={
                        type:"button",
                        label:"Cancel",
                        icon:"cancel",
                        viewId:"footer",
                        operations:{onInput: ()=>{this.mobile.disconnect();}}
                   };
                   this.mobile.addField(cancelButton,initData.form);

                   var nextButton={
                        type:"button",
                        label:"Continue",
                        icon:"continue",
                        viewId:"footer",
                        operations:{onInput:()=>{
                            this.mobile.uiForSendMessage();
                            this.setState(this.workflow.steps.messageForm.buildState());
                        }}
                    };
                    this.mobile.addField(nextButton,initData.form);
                    this.mobile.setInitData(initData);
          },
          uiForSendMessage:props=>{
                  var initData={
                          action:"input",
                          dataType:"form",
                          form:{
                                id:"###email###@me",
                                title:"Sending a Message",
                                label:"contacts",
                                fields:[]
                          }
                    };
                    const first_name={
                          id:"first_name",
                          type:"text",
                          label:"First Name",
                          value:"",
                          operations:{onInput:fistName=>this.setFirstName(fistName)}
                     };
                     this.mobile.setFirstName=this.mobile.addField(first_name,initData.form);

                     const last_name={
                          id:"last_name",
                          type:"text",
                          label:"Last Name",
                          value:"",
                          operations:{onInput:lastName=>this.setLastName(lastName)}
                     };
                     this.mobile.setLastName=this.mobile.addField(last_name,initData.form);

                     const email={
                          id:"email",
                          type:"text",
                          label:"Email",
                          value:"",
                          operations:{onInput:email=>this.setEmail(email)}
                    };
                    this.mobile.setEmail=this.mobile.addField(email,initData.form);

                    const phone={
                          id:"phone",
                          type:"text",
                          label:"Phone",
                          value:"",
                          operations:{onInput:phone=>this.setPhone(phone)}
                    };
                    this.mobile.setPhone=this.mobile.addField(phone,initData.form);

                    const messageField={
                          type:"text",
                          label:"Message",
                          value:"",
                          nLines:5,
                          operations:{onInput:message=>this.setMessage(message)}
                    };
                    this.mobile.setMessageContent=this.mobile.addField(messageField,initData.form);
                    const cancelButton={
                          label:"Cancel",
                          type:"button",
                          viewId:"footer",
                          operations:{onInput:()=>{this.mobile.disconnect();}
                          }
                    };
                    this.mobile.addField(cancelButton,initData.form);

                    const sendButton={
                          label:"Send",
                          type:"button",
                          viewId:"footer",
                          operations:{onInput:this.sendMessage.bind(this)}
                    };
                    this.mobile.addField(sendButton,initData.form);
                    this.mobile.setInitData(initData);
          }

    }



}

export default App;
