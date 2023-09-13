import { Construct } from "constructs";
import { App, TerraformStack, CloudBackend, TaggedCloudWorkspaces } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { NetworkModule } from "./.gen/modules/network-module";

class NetworkStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "aws", {
      region: "us-west-2"
    });

    new NetworkModule(this, "vpc", {
      baseCidrBlock: "192.168.0.0/16",
      envName: "cdktf-infra-config-dev",
      enableNatGateway: false
    });
  }
}

const app = new App();
const stack = new NetworkStack(app, "cdktf-infra-config");
new CloudBackend(stack, {
  hostname: "app.terraform.io",
  organization: "sprhoto",
  workspaces: new TaggedCloudWorkspaces(["cdktf-infra-config", "dev"])
});
app.synth();
