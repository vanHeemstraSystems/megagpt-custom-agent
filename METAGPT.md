# MetaGPT

## MetaGPT Custom Agent

Make sure you have completed [Hatch](HATCH.md) and [Nx](NX.md) before continuing.

The "/hatch-project/src/hatch_project/apps/" directory would be a good location for developing a MetaGPT custom agent! Let's create a new app specifically for your MetaGPT agent:

```
$ npx nx g @nx/react:app metagpt-agent --directory=hatch-project/src/hatch_project/apps/metagpt-agent
```

This is a good choice because:
1. It follows the Nx monorepo structure, keeping your agent code isolated and maintainable
2. You'll get all the benefits of Nx tooling (testing, building, dependency management)
3. The location apps/metagpt-agent clearly indicates this is a standalone application within your workspace

Looking at the MetaGPT repository, you'll likely need to:
1. Create components for agent interaction
2. Set up API integration with MetaGPT
3. Implement the agent's role and behaviors
4. Handle message flows and state management

After creating the app, you can:
Start development with:

```
$ npx nx serve metagpt-agent
```

Create new components with:

```
$ npx nx g @nx/react:component my-component --directory=apps/metagpt-agent/src/app
```

## Next Steps

1. Create components for agent interaction
2. Set up API integration with MetaGPT
3. Implement the agent's role and behaviors