# Artispreneur Agent OS — Setup Guide

Complete setup instructions for local development and production deployment.

## Prerequisites

- **Node.js 20+** (LTS recommended)
- **npm** or **pnpm**
- **Git**
- **AWS Account** (for Cognito, DynamoDB, S3, Bedrock)
- **GitHub CLI** (optional, for repo management)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/diamitani/artispreneur-agent-os.git
cd artispreneur-agent-os
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AWS Cognito (see AWS Setup below)
COGNITO_DOMAIN=https://artispreneur-dev.auth.us-east-1.amazoncognito.com
COGNITO_CLIENT_ID=your_client_id
COGNITO_CLIENT_SECRET=your_client_secret
COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
COGNITO_REGION=us-east-1

# Session
SESSION_SECRET=$(openssl rand -hex 32)

# Dev Mode (skip auth during development)
AUTH_DEV_BYPASS=1

# AWS Services
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret

# DynamoDB
DYNAMODB_INSTANCE_TABLE=artispreneur-instances-dev
DYNAMODB_USERS_TABLE=artispreneur-users-dev
DYNAMODB_PROJECTS_TABLE=artispreneur-projects-dev

# S3 Hub
S3_HUB_BUCKET=artispreneur-hub-dev
HUB_BACKEND=fs  # Use local filesystem during dev

# Bedrock
BEDROCK_MODEL_ID=us.anthropic.claude-sonnet-4-20250514-v1:0
BEDROCK_REGION=us-east-1
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## AWS Setup

### Step 1: Create Cognito User Pool

1. Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito)
2. Click **Create user pool**
3. Configure:
   - **Sign-in options**: Email
   - **Password policy**: Default
   - **MFA**: Optional (recommended: Optional MFA)
   - **User account recovery**: Email
   - **Self-registration**: Enabled
4. **App client**:
   - Type: Public client
   - Authentication flows: ALLOW_USER_SRP_AUTH, ALLOW_REFRESH_TOKEN_AUTH
   - OAuth 2.0 grant types: Authorization code grant
   - OAuth scopes: email, openid, profile
   - Callback URLs: `http://localhost:3000/api/auth/callback`, `https://yourdomain.com/api/auth/callback`
   - Sign out URL: `http://localhost:3000`, `https://yourdomain.com`
5. **Hosted UI domain**: Create subdomain (e.g., `artispreneur-dev`)
6. Save **User Pool ID**, **App Client ID**, **App Client Secret**, and **Domain**

### Step 2: Create DynamoDB Tables

Run AWS CLI commands or use AWS Console:

```bash
# Users table
aws dynamodb create-table \
  --table-name artispreneur-users-dev \
  --attribute-definitions AttributeName=userId,AttributeType=S \
  --key-schema AttributeName=userId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Projects table
aws dynamodb create-table \
  --table-name artispreneur-projects-dev \
  --attribute-definitions \
    AttributeName=userId,AttributeType=S \
    AttributeName=projectId,AttributeType=S \
  --key-schema \
    AttributeName=userId,KeyType=HASH \
    AttributeName=projectId,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST

# Instances table (for agent orchestration)
aws dynamodb create-table \
  --table-name artispreneur-instances-dev \
  --attribute-definitions AttributeName=instanceId,AttributeType=S \
  --key-schema AttributeName=instanceId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES
```

### Step 3: Create S3 Bucket for Hub Storage

```bash
aws s3 mb s3://artispreneur-hub-dev --region us-east-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket artispreneur-hub-dev \
  --versioning-configuration Status=Enabled

# Block public access
aws s3api put-public-access-block \
  --bucket artispreneur-hub-dev \
  --public-access-block-configuration \
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

### Step 4: Enable Bedrock Access

1. Go to [AWS Bedrock Console](https://console.aws.amazon.com/bedrock)
2. Click **Model access** in left sidebar
3. Request access to **Claude Sonnet 4** (Anthropic)
4. Wait for approval (usually instant for AWS accounts in good standing)

### Step 5: Create IAM User/Role

Create an IAM user or role with permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cognito-idp:*",
        "dynamodb:*",
        "s3:*",
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": "*"
    }
  ]
}
```

## Production Deployment

### Option 1: Vercel (Recommended)

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **New Project**
   - Import `artispreneur-agent-os` from GitHub

2. **Configure Environment Variables**:
   - Add all variables from `.env.example`
   - Set `NODE_ENV=production`
   - Set `AUTH_DEV_BYPASS=0`
   - Set `HUB_BACKEND=s3`
   - Update callback URLs to production domain

3. **Deploy**:
   - Vercel auto-deploys on push to `main`
   - View deployment at assigned URL

### Option 2: AWS (Self-Hosted)

Coming soon: AWS CDK infrastructure-as-code for ECS deployment.

## Testing the Setup

### 1. Health Check

```bash
curl http://localhost:3000/api/health
```

Expected: `{"status":"ok"}`

### 2. Test PAL Compilation

```bash
curl -X POST http://localhost:3000/api/pal/compile \
  -H "Content-Type: application/json" \
  -d '{
    "userInput": "Register my song with BMI",
    "agentKey": "pro",
    "soulKey": "manager"
  }'
```

Expected: Agent manifest JSON

### 3. Test Agent Execution (requires Bedrock)

```bash
curl -X POST http://localhost:3000/api/agents/execute \
  -H "Content-Type: application/json" \
  -d '{
    "agentKey": "pro",
    "message": "Help me register a song with BMI",
    "soulKey": "manager"
  }'
```

Expected: Streaming agent response

## Troubleshooting

### "Cognito authentication failed"
- Verify `COGNITO_CLIENT_ID` and `COGNITO_CLIENT_SECRET` are correct
- Check callback URLs include your domain
- Ensure OAuth scopes include `openid`, `email`, `profile`

### "DynamoDB AccessDeniedException"
- Verify IAM user has `dynamodb:*` permissions
- Check table names match `.env` configuration
- Ensure tables exist in the correct region

### "Bedrock model not found"
- Request access to Claude Sonnet 4 in Bedrock console
- Verify model ID: `us.anthropic.claude-sonnet-4-20250514-v1:0`
- Check `BEDROCK_REGION` matches where you requested access

### "S3 Access Denied"
- Verify bucket exists: `aws s3 ls s3://artispreneur-hub-dev`
- Check IAM permissions include `s3:*`
- Ensure bucket is in the same region as your application

### "Port 3000 already in use"
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

## Next Steps

- Read [ROSTR Framework Guide](./rostr-framework.md)
- Explore [Agent Development](./agent-development.md)
- Review [API Reference](./api-reference.md)
- Check [Contributing Guide](../CONTRIBUTING.md)

## Support

- **Issues**: [GitHub Issues](https://github.com/diamitani/artispreneur-agent-os/issues)
- **Discussions**: [GitHub Discussions](https://github.com/diamitani/artispreneur-agent-os/discussions)
- **Email**: support@artispreneur.com

---

**Built by Artispreneur** — Run the business like you mean it.
