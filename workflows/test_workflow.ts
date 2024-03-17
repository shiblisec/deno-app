import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts"

export const SayHiWorkflow = DefineWorkflow({
  callback_id: "say_hello_workflow",
  title: "Say Hello",
  input_parameters: {
    required: ["interactivity"],
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      }
    }
  }
});

const inputForm = SayHiWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Send a message",
    interactivity: SayHiWorkflow.inputs.interactivity,
    submit_label: "Send Message",
    fields: {
      elements: [
        {
          name: "userid",
          title: "Canvas Owner",
          type: Schema.slack.types.user_id
        },
        {
          name: "canvas_title",
          title: "Canvas Title",
          type: Schema.types.string
        },
        {
          name: "content",
          title: "Canvas Content",
          type: Schema.types.string
        }
      ],
      required: ["userid", "canvas_title"]
    }
  }
)

SayHiWorkflow.addStep(
  Schema.slack.functions.CanvasCreate,
  {
    title: inputForm.outputs.fields.canvas_title,
    owner_id: inputForm.outputs.fields.userid,
    canvas_create_type: "blank",
    content: inputForm.outputs.fields.content
  },
)

export default SayHiWorkflow