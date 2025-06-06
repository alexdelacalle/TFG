<?php

/**
 * src/Controller/Entity/EntityRelationsController.php
 *
 * @license https://opensource.org/licenses/MIT MIT License
 * @link    https://www.etsisi.upm.es/ ETS de Ingeniería de Sistemas Informáticos
 */

namespace TDW\ACiencia\Controller\Entity;

use Doctrine\ORM;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Http\Response;
use TDW\ACiencia\Controller\Element\ElementRelationsBaseController;
use TDW\ACiencia\Controller\Person\PersonQueryController;
use TDW\ACiencia\Controller\Product\ProductQueryController;
use TDW\ACiencia\Entity\Entity;

/**
 * Class EntityRelationsController
 */
final class EntityRelationsController extends ElementRelationsBaseController
{
    public static function getEntityClassName(): string
    {
        return EntityQueryController::getEntityClassName();
    }

    public static function getEntitiesTag(): string
    {
        return EntityQueryController::getEntitiesTag();
    }

    public static function getEntityIdName(): string
    {
        return EntityQueryController::getEntityIdName();
    }

    /**
     * Summary: GET /entities/{entityId}/persons
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     */
    public function getPersons(Request $request, Response $response, array $args): Response
    {
        $entityId = $args[EntityQueryController::getEntityIdName()] ?? 0;
        if ($entityId <= 0 || $entityId > 2147483647) {   // 404
            return $this->getElements($request, $response, null, PersonQueryController::getEntitiesTag(), []);
        }
        /** @var Entity|null $entity */
        $entity = $this->entityManager
            ->getRepository(EntityQueryController::getEntityClassName())
            ->find($entityId);

        $persons = $entity?->getPersons()->getValues() ?? [];

        return $this->getElements($request, $response, $entity, PersonQueryController::getEntitiesTag(), $persons);    }

    /**
     * PUT /entities/{entityId}/persons/add/{elementId}
     * PUT /entities/{entityId}/persons/rem/{elementId}
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     * @throws ORM\Exception\ORMException
     */
    public function operationPerson(Request $request, Response $response, array $args): Response
    {
        return $this->operationRelatedElements(
            $request,
            $response,
            $args,
            PersonQueryController::getEntityClassName()
        );    
    }

    /**
     * Summary: GET /entities/{entityId}/products
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     */
    public function getProducts(Request $request, Response $response, array $args): Response {
        $entityId = $args[EntityQueryController::getEntityIdName()] ?? 0;
        if ($entityId <= 0 || $entityId > 2147483647) {   // 404
            return $this->getElements($request, $response, null, ProductQueryController::getEntitiesTag(), []);
        }
        /** @var Entity|null $entity */
        $entity = $this->entityManager
            ->getRepository(EntityQueryController::getEntityClassName())
            ->find($entityId);

        $products = $entity?->getProducts()->getValues() ?? [];

        return $this->getElements($request, $response, $entity, ProductQueryController::getEntitiesTag(), $products);     
    }

    /**
     * PUT /entities/{entityId}/products/add/{elementId}
     * PUT /entities/{entityId}/products/rem/{elementId}
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     * @throws ORM\Exception\ORMException
     */
    public function operationProduct(Request $request, Response $response, array $args): Response {
        return $this->operationRelatedElements(
            $request,
            $response,
            $args,
            ProductQueryController::getEntityClassName()
        );       
    }
   
    public function optionsElements(Request $request, Response $response): Response {
        return $response
            ->withHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->withStatus(204);  
    }

    public function getElementByType(Request $request, Response $response, array $args): Response{
        $elementType = $args['elementType'];
        switch ($elementType) {
            case 'products':
                return $this->getProducts($request, $response, $args);
            case 'persons':
                return $this->getPersons($request, $response, $args);
            default:
                return $this->createErrorResponse($response, 'Invalid element type', 400);
        }
    }

        /**
     * PUT /entities/{entityId}/{elementType}/{operationType}/{elementId}
     *
     * @param Request $request
     * @param Response $response
     * @param array<string,mixed> $args
     *
     * @return Response
     * @throws ORM\Exception\ORMException
     */
    public function operationElementByType(Request $request, Response $response, array $args): Response
    {
        $elementType = $args['elementType'] ?? '';
        $className = match ($elementType) {
            'persons'  => \TDW\ACiencia\Controller\Person\PersonQueryController::getEntityClassName(),
            'products' => \TDW\ACiencia\Controller\Product\ProductQueryController::getEntityClassName(),
            default    => null,
        };

        if ($className === null) {
            return $response->withStatus(406);  // Not Acceptable
        }

        return $this->operationRelatedElements($request, $response, $args, $className);
    }

}
