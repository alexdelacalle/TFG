<?php

/**
 * src/Controller/Asociacion/AsociacionRelationsController.php
 *
 * @license https://opensource.org/licenses/MIT MIT License
 * @link    https://www.etsisi.upm.es/ ETS de Ingeniería de Sistemas Informáticos
 */

namespace TDW\ACiencia\Controller\Asociacion;

use Doctrine\ORM;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response;
use TDW\ACiencia\Controller\Element\ElementRelationsBaseController;
use TDW\ACiencia\Controller\Entity\EntityQueryController;
use TDW\ACiencia\Entity\Asociacion;

/**
 * Class AsociacionRelationsController
 */
final class AsociacionRelationsController extends ElementRelationsBaseController
{
    public static function getEntityClassName(): string
    {
        return AsociacionQueryController::getEntityClassName();
    }

    public static function getEntitiesTag(): string
    {
        return AsociacionQueryController::getEntitiesTag();
    }

    public static function getEntityIdName(): string
    {
        return EntityQueryController::getEntityIdName();
    }

    /**
     * Summary: GET /asociaciones/{asociacionId}/entities
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     */
    public function getEntities(Request $request, Response $response, array $args): Response
    {
        $asociacionId = $args[AsociacionQueryController::getEntityIdName()] ?? 0;
        if ($asociacionId <= 0 || $asociacionId > 2147483647) {   // 404
            return $this->getElements($request, $response, null, EntityQueryController::getEntitiesTag(), []);
        }
        /** @var Entity|null $entity */
        $asociacion = $this->entityManager
            ->getRepository(AsociacionQueryController::getEntityClassName())
            ->find($asociacionId);

        $entities = $asociacion?->getEntities()->getValues() ?? [];

        return $this->getElements($request, $response, $entity, EntityQueryController::getEntitiesTag(), $entities);    }

    /**
     * PUT /asociaciones/{asociacionId}/entities/add/{elementId}
     * PUT /asociaciones/{asociacionId}/entities/rem/{elementId}
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     * @throws ORM\Exception\ORMException
     */
    public function operationEntity(Request $request, Response $response, array $args): Response
    {
        return $this->operationRelatedElements(
            $request,
            $response,
            $args,
            EntityQueryController::getEntityClassName()
        );    
    }

    
    public function optionsElements(Request $request, Response $response): Response {
        return $response
            ->withHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->withStatus(204);  
    }
}
