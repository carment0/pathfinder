import { Router, Request, Response } from 'express'
import * as Path from 'path'
import { InMemoryStore } from '../stores/in_memory'

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    InMemoryStore.set("user", InMemoryStore.get("user") + 1)
    res.setHeader('content-type', 'application/json');
    res.send({
        "user": InMemoryStore.get("user")
    })
});

export const FooController: Router = router;