terraform {
  backend "remote" {
    organization = "sprhoto"
    workspaces {
      prefix = "cdktf-infra-config-"
    }
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}
provider "aws" {
  region = "us-west-2"
}
