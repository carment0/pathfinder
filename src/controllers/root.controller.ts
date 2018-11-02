import { Router, Request, Response } from 'express';
import * as Path from 'path';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.sendFile(Path.join(__dirname, '../../public/index.html'));
});

export const RootController: Router = router;