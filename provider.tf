terraform {
  backend "remote" {
    organization = "sprhoto"
    workspaces {
      prefix = "cdktf-infra-config-"
    }
  }
}
